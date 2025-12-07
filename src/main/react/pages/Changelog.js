import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import Header from "../Header";
import SEO from "../utils/SEO";

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/silentsoft/hits/refs/heads/main/';

export default function Changelog() {
    const [changelog, setChangelog] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // Fetch CHANGELOG.md from GitHub
        fetch(GITHUB_RAW_BASE + 'CHANGELOG.md')
            .then(response => response.text())
            .then(text => {
                // Parse changelog into entries
                const entries = parseChangelog(text);
                setChangelog(entries);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to load changelog:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!loading && location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [loading, location.hash]);

    const parseChangelog = (text) => {
        // ... (parser logic remains the same)
        const entries = [];
        const lines = text.split('\n');
        let currentEntry = null;
        let currentSection = null;
        let inCodeBlock = false;
        let codeBlockLang = '';
        let codeBlockContent = [];
        let currentListItem = null;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const indentMatch = line.match(/^(\s*)/);
            const indent = indentMatch ? indentMatch[1].length : 0;

            // Check for code block markers
            const codeBlockMatch = line.match(/^(\s*)```(\w*)$/);
            if (codeBlockMatch) {
                if (!inCodeBlock) {
                    inCodeBlock = true;
                    codeBlockLang = codeBlockMatch[2] || 'text';
                    codeBlockContent = [];
                } else {
                    // End of code block
                    inCodeBlock = false;
                    const codeBlock = {
                        type: 'code',
                        language: codeBlockLang,
                        content: codeBlockContent.join('\n')
                    };

                    if (currentListItem) {
                        currentListItem.nested.push(codeBlock);
                    } else if (currentSection) {
                        currentSection.content.push(codeBlock);
                    }
                    codeBlockContent = [];
                }
                continue;
            }

            if (inCodeBlock) {
                // Remove the indentation that matches the code block's indentation
                const dedentedLine = line.replace(/^\s{0,2}/, '');
                codeBlockContent.push(dedentedLine);
                continue;
            }

            // Match version header (e.g., "# 1.4.27 (24 Nov 2025)")
            const versionMatch = line.match(/^#\s+(\S+)\s+\((.+)\)$/);
            if (versionMatch) {
                if (currentEntry) {
                    entries.push(currentEntry);
                }
                currentEntry = {
                    version: versionMatch[1],
                    date: versionMatch[2],
                    sections: [],
                    content: []
                };
                currentSection = null;
                currentListItem = null;
                continue;
            }

            // ... (rest of parser logic)
            // Match section header (e.g., "## Dependency Updates")
            const sectionMatch = line.match(/^##\s+(.+)$/);
            if (sectionMatch && currentEntry) {
                currentSection = {
                    title: sectionMatch[1],
                    content: []
                };
                currentEntry.sections.push(currentSection);
                currentListItem = null;
                continue;
            }

            // Match subsection header (e.g., "### view")
            const subsectionMatch = line.match(/^###\s+(.+)$/);
            if (subsectionMatch && currentSection) {
                currentSection.content.push({
                    type: 'subsection',
                    title: subsectionMatch[1]
                });
                currentListItem = null;
                continue;
            }

            // Match list items respecting nesting level
            const listMatch = line.match(/^(\s*)[-*]\s+(.+)$/);
            if (listMatch) {
                const itemIndent = listMatch[1].length;
                const itemText = listMatch[2];

                // Check if the list item contains only an image
                const imageInListMatch = itemText.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);

                const listItem = {
                    type: 'list',
                    text: itemText,
                    nested: [],
                    indent: itemIndent,
                    isImage: !!imageInListMatch  // Mark if this list item is just an image
                };

                // If the list item is just an image, process it to get the absolute URL
                if (imageInListMatch) {
                    const imageSrc = imageInListMatch[2];
                    const absoluteSrc = imageSrc.startsWith('http') ? imageSrc : GITHUB_RAW_BASE + imageSrc;
                    listItem.imageData = {
                        alt: imageInListMatch[1],
                        src: absoluteSrc
                    };
                }

                if (itemIndent === 0 && currentSection) {
                    // Top-level list item
                    currentListItem = listItem;
                    currentSection.content.push(currentListItem);
                } else if (itemIndent >= 4 && currentListItem && currentListItem.nested.length > 0) {
                    // Third-level or deeper - add to last second-level item
                    const lastSecondLevel = currentListItem.nested[currentListItem.nested.length - 1];
                    if (lastSecondLevel.type === 'list') {
                        if (!lastSecondLevel.nested) lastSecondLevel.nested = [];
                        lastSecondLevel.nested.push(listItem);
                    } else {
                        currentListItem.nested.push(listItem);
                    }
                } else if (itemIndent >= 2 && currentListItem) {
                    // Second-level - add to current top-level list item
                    currentListItem.nested.push(listItem);
                } else if (itemIndent === 0 && currentEntry && !currentSection) {
                    // List item before any section
                    currentEntry.content.push(listItem);
                }
                continue;
            }

            // Match images (e.g., "![](.images/...)")
            // Handle both standalone and consecutive indented images
            const imageMatch = line.match(/^(\s*)!\[([^\]]*)\]\(([^)]+)\)$/);
            if (imageMatch) {
                const imageIndent = imageMatch[1].length;
                const imageSrc = imageMatch[3];
                const absoluteSrc = imageSrc.startsWith('http') ? imageSrc : GITHUB_RAW_BASE + imageSrc;

                const imageItem = {
                    type: 'image',
                    alt: imageMatch[2],
                    src: absoluteSrc
                };

                // Check if this is part of a group of images (2-space indent continuation)
                if (imageIndent === 2 && currentListItem) {
                    // Check if the last item in nested is already an image group
                    const lastItem = currentListItem.nested[currentListItem.nested.length - 1];
                    if (lastItem && lastItem.type === 'imageGroup') {
                        // Add to existing group
                        lastItem.images.push(imageItem);
                    } else {
                        // Create new image group
                        currentListItem.nested.push({
                            type: 'imageGroup',
                            images: [imageItem]
                        });
                    }
                } else if (imageIndent >= 4 && currentListItem && currentListItem.nested.length > 0) {
                    // This is a third-level item (or deeper) - add to the last second-level item
                    const lastSecondLevel = currentListItem.nested[currentListItem.nested.length - 1];
                    if (lastSecondLevel.type === 'list') {
                        if (!lastSecondLevel.nested) lastSecondLevel.nested = [];
                        lastSecondLevel.nested.push(imageItem);
                    } else {
                        currentListItem.nested.push(imageItem);
                    }
                } else if (currentSection) {
                    currentSection.content.push(imageItem);
                } else if (currentEntry) {
                    currentEntry.content.push(imageItem);
                }
                continue;
            }

            // Match badges/images in regular text
            const badgeMatch = line.match(/\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)/);
            if (badgeMatch && (currentSection || currentEntry)) {
                const target = currentSection || currentEntry;
                target.content.push({
                    type: 'badge',
                    alt: badgeMatch[1],
                    src: badgeMatch[2],
                    link: badgeMatch[3]
                });
                currentListItem = null;
                continue;
            }

            // Regular text paragraphs (non-empty lines that don't match other patterns)
            if (line.trim()) {
                const textItem = {
                    type: 'text',
                    content: line.trim()
                };

                if (currentListItem && indent > 0 && !listMatch) {
                    // Indented text belonging to list item
                    currentListItem.nested.push(textItem);
                } else if (currentSection) {
                    currentSection.content.push(textItem);
                    currentListItem = null;
                } else if (currentEntry) {
                    currentEntry.content.push(textItem);
                    currentListItem = null;
                }
            }
        }

        if (currentEntry) {
            entries.push(currentEntry);
        }

        return entries;
    };

    // ... (render functions remain the same)
    const renderMarkdownLinks = (text) => {
        // Convert markdown links [text](url) to HTML links
        // But skip CSS function-like syntax (e.g., rgb[a](red, green, blue))
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = linkRegex.exec(text)) !== null) {
            const linkText = match[1];
            const linkUrl = match[2];

            // Skip if this looks like CSS function syntax
            // Check if the text before the bracket is a CSS function name
            const beforeMatch = text.substring(Math.max(0, match.index - 10), match.index);
            const cssPattern = /(rgb|cmyk|hsl)a?$/i;
            if (cssPattern.test(beforeMatch)) {
                // This is CSS syntax, not a markdown link - skip it
                continue;
            }

            // Also check if the URL looks valid (contains http, https, or is a relative path)
            const isValidLink = linkUrl.includes('://') || linkUrl.startsWith('/') || linkUrl.startsWith('.') || linkUrl.startsWith('#');

            if (!isValidLink) {
                // Doesn't look like a real link, skip it
                continue;
            }

            if (match.index > lastIndex) {
                parts.push(text.substring(lastIndex, match.index));
            }
            parts.push(
                <a
                    key={match.index}
                    href={linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 underline"
                >
                    {linkText}
                </a>
            );
            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }

        return parts.length > 0 ? parts : text;
    };

    const renderBoldText = (text) => {
        // Convert **bold** to <strong> tags
        const boldRegex = /\*\*([^*]+)\*\*/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = boldRegex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                const beforeText = text.substring(lastIndex, match.index);
                parts.push(...(Array.isArray(renderInlineCode(beforeText)) ? renderInlineCode(beforeText) : [beforeText]));
            }
            parts.push(
                <strong key={match.index} className="font-semibold text-slate-200">
                    {renderInlineCode(match[1])}
                </strong>
            );
            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < text.length) {
            const remainingText = text.substring(lastIndex);
            parts.push(...(Array.isArray(renderInlineCode(remainingText)) ? renderInlineCode(remainingText) : [remainingText]));
        }

        return parts.length > 0 ? parts : renderInlineCode(text);
    };

    const renderInlineCode = (text) => {
        // Convert `code` to styled inline code
        const codeRegex = /`([^`]+)`/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = codeRegex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                const beforeText = text.substring(lastIndex, match.index);
                parts.push(...(Array.isArray(renderMarkdownLinks(beforeText)) ? renderMarkdownLinks(beforeText) : [beforeText]));
            }
            parts.push(
                <code key={match.index} className="px-1.5 py-0.5 bg-purple-900/30 text-purple-300 rounded text-sm">
                    {match[1]}
                </code>
            );
            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < text.length) {
            const remainingText = text.substring(lastIndex);
            parts.push(...(Array.isArray(renderMarkdownLinks(remainingText)) ? renderMarkdownLinks(remainingText) : [remainingText]));
        }

        return parts.length > 0 ? parts : renderMarkdownLinks(text);
    };

    const renderNestedContent = (items, depth = 0) => {
        return items.map((item, idx) => {
            switch (item.type) {
                case 'list':
                    // Calculate margin based on depth: depth 1 = 1.5rem, depth 2 = 3rem, etc.
                    const marginClass = depth === 0 ? '' : `ml-${depth * 6}`;
                    return (
                        <li key={idx} className={`flex items-start ${marginClass}`}>
                            <span className="text-purple-400 mr-2 mt-0.5">•</span>
                            <div className="flex-1 min-w-0">
                                {item.isImage && item.imageData ? (
                                    <img src={item.imageData.src} alt={item.imageData.alt} className="inline-block max-h-6" />
                                ) : (
                                    <span>{renderBoldText(item.text)}</span>
                                )}
                                {item.nested && item.nested.length > 0 && (
                                    <div className="mt-2 space-y-2">
                                        {renderNestedContent(item.nested, depth + 1)}
                                    </div>
                                )}
                            </div>
                        </li>
                    );
                case 'imageGroup':
                    return (
                        <div key={idx} className="flex flex-wrap gap-1 my-2">
                            {item.images.map((img, imgIdx) => (
                                <img key={imgIdx} src={img.src} alt={img.alt} className="inline-block max-h-6" />
                            ))}
                        </div>
                    );
                case 'text':
                    return (
                        <p key={idx} className="text-slate-400">
                            {renderBoldText(item.content)}
                        </p>
                    );
                case 'code':
                    return (
                        <pre key={idx} className="bg-slate-900/50 p-4 rounded-lg overflow-x-auto max-w-full">
                            <code className="text-sm text-slate-300 whitespace-pre">{item.content}</code>
                        </pre>
                    );
                case 'image':
                    return (
                        <div key={idx} className="my-1">
                            <img src={item.src} alt={item.alt} className="inline-block max-h-6 mx-0.5" />
                        </div>
                    );
                default:
                    return null;
            }
        });
    };

    const renderContent = (contentItem, idx) => {
        switch (contentItem.type) {
            case 'list':
                return (
                    <ul key={idx} className="space-y-1 text-slate-400">
                        {renderNestedContent([contentItem])}
                    </ul>
                );
            case 'subsection':
                return (
                    <h4 key={idx} className="text-base font-semibold text-slate-200 mt-4 mb-2">
                        {contentItem.title}
                    </h4>
                );
            case 'text':
                return (
                    <p key={idx} className="text-slate-400 mb-2">
                        {renderBoldText(contentItem.content)}
                    </p>
                );
            case 'code':
                return (
                    <pre key={idx} className="bg-slate-900/50 p-4 rounded-lg overflow-x-auto max-w-full">
                        <code className="text-sm text-slate-300 whitespace-pre">{contentItem.content}</code>
                    </pre>
                );
            case 'image':
                return (
                    <div key={idx} className="my-4">
                        <img src={contentItem.src} alt={contentItem.alt} className="rounded-lg max-w-full" />
                    </div>
                );
            case 'badge':
                return (
                    <div key={idx} className="my-2">
                        <a href={contentItem.link} target="_blank" rel="noopener noreferrer">
                            <img src={contentItem.src} alt={contentItem.alt} className="inline-block" />
                        </a>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-purple-500 selection:text-white relative overflow-hidden">
            <SEO
                title="Changelog"
                description="Stay up to date with the latest features, improvements, and bug fixes for Hits."
                path="/changelog/"
            />
            {/* Aurora Background */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>

            <Header />

            <main className="relative z-10 container max-w-4xl mx-auto px-6 pt-12 pb-32">
                <h1 className="text-4xl font-bold mb-12 text-center">Changelog</h1>

                {loading ? (
                    <div className="text-center text-slate-400">Loading changelog...</div>
                ) : (
                    <div className="space-y-8">
                        {changelog.map((entry, idx) => (
                            <article key={idx} className="bg-[#151925]/50 border border-white/5 rounded-xl p-6 hover:border-purple-500/20 transition-colors">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 id={entry.version} className="text-2xl font-bold text-purple-400 scroll-mt-24">v{entry.version}</h2>
                                    <span className="text-sm text-slate-500">{entry.date}</span>
                                </div>

                                {/* Render content before sections */}
                                {entry.content && entry.content.length > 0 && (
                                    <div className="mb-4 space-y-2">
                                        {entry.content.map((item, cIdx) => renderContent(item, cIdx))}
                                    </div>
                                )}

                                {/* Render sections */}
                                {entry.sections.map((section, sIdx) => (
                                    <div key={sIdx} className="mb-4 last:mb-0">
                                        <h3 className="text-lg font-semibold text-slate-100 mb-3">{section.title}</h3>
                                        <div className="space-y-2">
                                            {section.content.map((item, cIdx) => renderContent(item, cIdx))}
                                        </div>
                                    </div>
                                ))}
                            </article>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
