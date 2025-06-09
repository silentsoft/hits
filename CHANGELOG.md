# 1.4.5 (09 Jun 2025)

## Dependency Updates
- [badge4j v1.15.0](https://github.com/silentsoft/badge4j/releases/tag/v1.15.0)

# 1.4.4 (02 Jun 2025)

## Dependency Updates
- [badge4j v1.14.0](https://github.com/silentsoft/badge4j/releases/tag/v1.14.0)

# 1.4.3 (29 May 2025)

## Dependency Updates
- [badge4j v1.13.0](https://github.com/silentsoft/badge4j/releases/tag/v1.13.0)

# 1.4.2 (29 May 2025)

## Enhancements
- Update Twitter icon to X (#24)
- Update GitHub icon

# 1.4.1 (31 Jul 2024)

## Bugfixes
- Fix clipboard copy issue

# 1.4.0 (18 Mar 2022)

## Enhancements
- Add auto focus feature.
- Remove terminal component.
- Supports [simple-icons v6.14.0](https://github.com/simple-icons/simple-icons/releases/tag/6.14.0).

# 1.3.0 (2 Mar 2022)

## Enhancements
- Supports [simple-icons v6.12.0](https://github.com/simple-icons/simple-icons/releases/tag/6.12.0).
- Bump TailwindCSS from v2 to v3.

# 1.2.0 (25 Feb 2022)

## Enhancements
- Add favicon files.

# 1.1.0 (25 Feb 2022)

## Enhancements
- Add alt attribute to image tag.

# 1.0.0 (24 Feb 2022)

![](.images/hits-readme.png)

## Getting Started
`Hits` supports the following three of the most common use cases: `Markdown`, `HTML` and `Image Link`.

For example, to get a hits badge for `https://github.com/silentsoft/hits`:

[![Hits](https://hits.sh/github.com/silentsoft/hits.svg)](https://hits.sh/github.com/silentsoft/hits/)

- Markdown
  ```markdown
  [![Hits](https://hits.sh/github.com/silentsoft/hits.svg)](https://hits.sh/github.com/silentsoft/hits/)
  ```
- HTML
  ```html
  <a href="https://hits.sh/github.com/silentsoft/hits/"><img src="https://hits.sh/github.com/silentsoft/hits.svg"/></a>
  ```
- Image Link
  ```
  https://hits.sh/github.com/silentsoft/hits.svg
  ```

## Features in Query String

### view
- `total` (default)
- `today-total`

### style
- `flat` (default)
- `flat-square`
- `for-the-badge`
- `plastic`

### label
- For setting the label text instead of the default `hits`.

### extraCount
- This is useful if you want to add an extra count to your badge. For example, if you want to add a count of `1000` to your badge, you can set `extraCount=1000`.
- **When Do I Need This?**
  - If the hit counter service you used previously has end-of-service, you can start with any number instead of starting from 1.

### color, labelColor
- Named color by shields.io

  ![](.images/color-brightgreen.svg)
  ![](.images/color-green.svg)
  ![](.images/color-yellow.svg)
  ![](.images/color-yellowgreen.svg)
  ![](.images/color-orange.svg)
  ![](.images/color-red.svg)
  ![](.images/color-blue.svg)
  ![](.images/color-grey.svg)
  ![](.images/color-lightgrey.svg)
  ![](.images/color-gray.svg)
  ![](.images/color-lightgray.svg)
  ![](.images/color-critical.svg)
  ![](.images/color-important.svg)
  ![](.images/color-success.svg)
  ![](.images/color-informational.svg)
  ![](.images/color-inactive.svg)

- Any valid [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)
  - named color
    - ![](.images/color-black.svg)
    - ![](.images/color-rebeccapurple.svg)
    - etc.
  - hexadecimal numbers
    - ![](.images/color-ff69b4.svg)
    - ![](.images/color-9cf.svg)
    - etc.
  - rgb[a](red, green, blue[, opacity])
  - cmyk[a](cyan, magenta, yellow, black[, opacity])
  - hsl[a](hue, saturation, lightness[, opacity])

### logo
- [simple-icons slug](https://github.com/simple-icons/simple-icons/blob/develop/slugs.md)
- or data:image/svg+xml;base64,..

## Statistics
You can see the statistics of your website by replacing the `.svg` with `/` in the URL you used to get the badge.

For example, to get a statistics for `https://github.com/silentsoft/hits` then visit [https://hits.sh/github.com/silentsoft/hits/](https://hits.sh/github.com/silentsoft/hits/)

![](.images/hits-statistics.png)

## Installation
```
$ git clone https://github.com/silentsoft/hits.git
$ cd hits
$ mvnw spring-boot:run
```

![](.images/hits-screenshot.png)

## Packaging
```
$ mvnw clean package -P production
```