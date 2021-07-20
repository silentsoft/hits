package org.silentsoft.oss;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.DisabledOnOs;
import org.junit.jupiter.api.condition.OS;

import java.io.*;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class NoticeFileTest {

    @Test
    @DisabledOnOs(OS.WINDOWS)
    public void noticeFileTest() throws Exception {
        NoticeFileGenerator.NoticeFileBuilder noticeBuilder = NoticeFileGenerator.newInstance("Hits", "silentsoft.org");

        addFrontendLibraries(noticeBuilder);
        addBackendLibraries(noticeBuilder);

        String markdown = noticeBuilder.generate();
        System.out.println("--------START OF THE NOTICE FILE--------");
        System.out.println(markdown);
        System.out.println("---------END OF THE NOTICE FILE---------");

        StringBuilder stringBuilder = new StringBuilder();
        try (FileReader fileReader = new FileReader(Paths.get(System.getProperty("user.dir"), "NOTICE.md").toFile());
             BufferedReader bufferedReader = new BufferedReader(fileReader)) {
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                stringBuilder.append(line);
                stringBuilder.append("\r\n");
            }
        }
        Assertions.assertEquals(markdown.trim(), stringBuilder.toString().trim());
    }

    private void addFrontendLibraries(NoticeFileGenerator.NoticeFileBuilder noticeBuilder) throws Exception {
        noticeBuilder.addLibrary("Terminal Style Portfolio in ReactJS", "by Jacob Lockett", "https://codepen.io/HuntingHawk/pen/rNaEZxW", License.of("MIT"));

        File directory = Paths.get(System.getProperty("user.dir")).toFile();

        StringBuilder commandBuilder = new StringBuilder();
        if (System.getProperty("os.name").toLowerCase().startsWith("windows")) {
            commandBuilder.append("npx.cmd");
        } else {
            commandBuilder.append("npx");
        }
        commandBuilder.append(" license-checker --production --json --customPath " + Paths.get(getClass().getResource("format.json").toURI()).toAbsolutePath());

        Process process = Runtime.getRuntime().exec(commandBuilder.toString(), null, directory);
        StringBuilder builder = new StringBuilder();
        try (InputStreamReader inputStreamReader = new InputStreamReader(process.getInputStream());
             BufferedReader reader = new BufferedReader(inputStreamReader)) {
            String line;
            while ((line = reader.readLine()) != null) {
                builder.append(line);
            }
        }
        process.waitFor();

        ObjectMapper objectMapper = new ObjectMapper();
        LicenseSummaryJsonObject map = objectMapper.readValue(builder.toString(), LicenseSummaryJsonObject.class);
        map.remove(self());

        for (Map.Entry<String, LicenseDetailJsonObject> entry : map.entrySet()) {
            LicenseDetailJsonObject detail = entry.getValue();
            String lib = String.join(" ", detail.getName(), detail.getVersion());

            if ("MIT*".equals(detail.getLicenses())) {
                if ("rework 1.0.1".equals(lib)) {
                    detail.setLicenses("MIT");
                }
            }

            String url = detail.getUrl();
            url = (url != null) ? url : detail.getRepository();
            url = (url != null) ? url : "";
            if (url.contains("github.com") && url.endsWith(".git")) {
                url = url.substring(0, url.length() - ".git".length());
            }
            if ("".equals(url)) {
                if ("@webassemblyjs/helper-fsm 1.9.0".equals(lib)) {
                    url = "https://github.com/xtuc/webassemblyjs";
                } else if ("@webassemblyjs/ieee754 1.9.0".equals(lib)) {
                    url = "https://github.com/xtuc/webassemblyjs";
                } else if ("@webassemblyjs/leb128 1.9.0".equals(lib)) {
                    url = "https://github.com/xtuc/webassemblyjs";
                } else if ("rework-visit 1.0.0".equals(lib)) {
                    url = "https://github.com/reworkcss/rework-visit";
                } else if ("@webassemblyjs/helper-api-error 1.9.0".equals(lib)) {
                    url = "https://github.com/xtuc/webassemblyjs";
                } else if ("dotenv-expand 5.1.0".equals(lib)) {
                    url = "https://github.com/motdotla/dotenv-expand";
                } else if ("@babel/preset-modules 0.1.4".equals(lib)) {
                    url = "https://github.com/babel/preset-modules";
                } else {
                    throw new RuntimeException(String.format("%s has an empty url.", lib));
                }
            }
            if (detail.getLicenses().startsWith("(") && detail.getLicenses().endsWith(")")) {
                detail.setLicenses(detail.getLicenses().substring(1, detail.getLicenses().length() - 1));
                if (detail.getLicenses().contains(" OR ")) {
                    String[] licenses = detail.getLicenses().split(" OR ");
                    for (String license : licenses) {
                        noticeBuilder.addLibrary(detail.getName(), detail.getVersion(), url, License.of(license));
                    }
                } else if (detail.getLicenses().contains(" AND ")) {
                    String[] licenses = detail.getLicenses().split(" AND ");
                    for (String license : licenses) {
                        noticeBuilder.addLibrary(detail.getName(), detail.getVersion(), url, License.of(license));
                    }
                } else {
                    throw new RuntimeException(String.format("The given license '%s' cannot be recognized.", detail.getLicenses()));
                }
            } else {
                noticeBuilder.addLibrary(detail.getName(), detail.getVersion(), url, License.of(detail.getLicenses()));
            }
        }
    }

    private String self() throws IOException {
        StringBuilder stringBuilder = new StringBuilder();
        try (FileReader fileReader = new FileReader(Paths.get(System.getProperty("user.dir"), "package.json").toFile());
             BufferedReader bufferedReader = new BufferedReader(fileReader)) {
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                stringBuilder.append(line);
            }
        }
        ObjectMapper objectMapper = new ObjectMapper();
        PackageJsonObject packageJson = objectMapper.readValue(stringBuilder.toString(), PackageJsonObject.class);

        return String.join("@", packageJson.getName(), packageJson.getVersion());
    }

    private void addBackendLibraries(NoticeFileGenerator.NoticeFileBuilder noticeBuilder) throws Exception {
        File directory = Paths.get(System.getProperty("user.dir")).toFile();

        StringBuilder commandBuilder = new StringBuilder();
        if (System.getProperty("os.name").toLowerCase().startsWith("windows")) {
            commandBuilder.append("mvnw.cmd");
        } else {
            commandBuilder.append("./mvnw");
        }
        commandBuilder.append(" license:add-third-party");

        Process process = Runtime.getRuntime().exec(commandBuilder.toString(), null, directory);
        process.waitFor();

        try (FileReader fileReader = new FileReader(new File(directory, "target/generated-sources/license/THIRD-PARTY.txt"));
             BufferedReader bufferedReader = new BufferedReader(fileReader)) {
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                line = line.trim();
                if (line.length() == 0 || line.startsWith("Lists of ")) {
                    continue;
                }

                String[] artifactAndUrl = line.substring(line.lastIndexOf("(")+1, line.length()-1).split(" - ");
                String[] groupAndArtifactAndVersion = artifactAndUrl[0].split(":");
                String artifact = groupAndArtifactAndVersion[1];
                String version = groupAndArtifactAndVersion[2];
                String url = artifactAndUrl[1];

                String[] licenseNames = line.substring(1, line.substring(0, line.indexOf(artifactAndUrl[0])-3).lastIndexOf(")")).split("\\) \\(");
                if (licenseNames.length == 1) {
                    if ("CDDL/GPLv2+CE".equals(licenseNames[0])) {
                        licenseNames = new String[]{ "CDDL 1.1", "GPL2 w/ CPE" };
                    } else if ("MPL 2.0 or EPL 1.0".equals(licenseNames[0])) {
                        licenseNames = new String[]{ "MPL 2.0", "EPL 1.0" };
                    }
                }
                for (int i=0, j=licenseNames.length; i<j; i++) {
                    String license = licenseNames[i];
                    if ("antlr".equals(artifact) && "BSD License".equals(license)) {
                        licenseNames[i] = "BSD 3-Clause License";
                    } else if (artifact.startsWith("logback") && "GNU Lesser General Public License".equals(license)) {
                        licenseNames[i] = "GNU Lesser General Public License v2.1";
                    }
                }
                List<License> licenses = Stream.of(licenseNames).map(licenseName -> License.of(licenseName)).collect(Collectors.toList());
                noticeBuilder.addLibrary(artifact, version, url, licenses.toArray(new License[0]));
            }
        }

        noticeBuilder.addLibrary("spring-boot-loader", "2.5.2", "https://spring.io/projects/spring-boot", License.of("Apache 2.0"));
        noticeBuilder.addLibrary("spring-boot-jarmode-layertools", "2.5.2", "https://spring.io/projects/spring-boot", License.of("Apache 2.0"));
    }

}
