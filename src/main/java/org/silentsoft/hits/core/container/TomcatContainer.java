package org.silentsoft.hits.core.container;

import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.stereotype.Component;

@Component
public class TomcatContainer implements WebServerFactoryCustomizer<TomcatServletWebServerFactory> {

    @Override
    public void customize(TomcatServletWebServerFactory factory) {
        factory.addConnectorCustomizers(connector -> {
            /* to fix - [GET] Invalid character found in the request target. The valid characters are defined in RFC 7230 and RFC 3986 */
            connector.setAttribute("relaxedQueryChars", "[]");
        });

    }

}
