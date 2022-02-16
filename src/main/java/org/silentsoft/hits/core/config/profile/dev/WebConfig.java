package org.silentsoft.hits.core.config.profile.dev;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.stream.Stream;

@Profile("dev")
@Configuration("DevWebConfig")
public class WebConfig implements WebMvcConfigurer {

    @Value("${cors.allowed.origins}")
    private String allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods(Stream.of(HttpMethod.values()).map(value -> value.name()).toArray(String[]::new))
                .allowedHeaders("*")
                .allowedOrigins(allowedOrigins)
                .allowCredentials(true);
    }
}
