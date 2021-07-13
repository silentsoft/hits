package org.silentsoft.hits.controller;

import static org.hamcrest.Matchers.equalTo;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.asyncDispatch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;

import org.junit.jupiter.api.Test;
import org.silentsoft.badge4j.Badge;
import org.silentsoft.badge4j.Style;
import org.silentsoft.hits.entity.HitsMigrationEntity;
import org.silentsoft.hits.repository.HitsMigrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.sql.Timestamp;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("dev")
public class HitsControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private HitsMigrationRepository hitsMigrationRepository;

    @Test
    public void basicTest() throws Exception {
        mvc.perform(asyncDispatch(mvc.perform(get("/github.com/silentsoft.svg")).andReturn()))
                .andExpect(status().isOk())
                .andExpect(header().string("Cache-Control", "no-cache, no-store, must-revalidate"))
                .andExpect(header().dateValue("Expires", 0))
                .andExpect(content().contentType("image/svg+xml;charset=UTF-8"));
    }

    @Test
    public void contentTest() throws Exception {
        mvc.perform(asyncDispatch(mvc.perform(get("/github.com/silentsoft/hits.svg")).andReturn()))
                .andExpect(content().string(equalTo(Badge.builder().label("hits").message("1").build())));

        mvc.perform(asyncDispatch(mvc.perform(get("/github.com/silentsoft/hits.svg")).andReturn()))
                .andExpect(content().string(equalTo(Badge.builder().label("hits").message("2").build())));
    }

    @Test
    public void badRequestTest() throws Exception {
        mvc.perform(asyncDispatch(mvc.perform(get("/.svg")).andReturn()))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(equalTo(Badge.builder().label("hits").message("Not a valid URI").color("inactive").build())));

        mvc.perform(asyncDispatch(mvc.perform(get("/not-contains-dot.svg")).andReturn()))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(equalTo(Badge.builder().label("hits").message("Not a valid URI").color("inactive").build())));
    }

    @Test
    public void uriTooLongTest() throws Exception {
        String x240 = "xxxxxxxxxx".replaceAll("x", "xxxxxxxxxxxxxxxxxxxxxxxx");

        String x250 = x240.concat("xxxxxx.com");

        mvc.perform(asyncDispatch(mvc.perform(get(String.format("/%s.svg", x250))).andReturn()))
                .andExpect(status().isOk())
                .andExpect(content().string(equalTo(Badge.builder().label("hits").message("1").build())));

        String x251 = x250.concat("x");

        mvc.perform(asyncDispatch(mvc.perform(get(String.format("/%s.svg", x251))).andReturn()))
                .andExpect(status().isUriTooLong())
                .andExpect(content().string(equalTo(Badge.builder().label("hits").message(HttpStatus.URI_TOO_LONG.getReasonPhrase()).color("inactive").build())));
    }

    @Test
    public void badgeDecorationTest() throws Exception {
        mvc.perform(asyncDispatch(mvc.perform(get("/a.test.com.svg?style=flat&label=custom&color=black&labelColor=white&link=left.silentsoft.org&link=right.silentsoft.org&logo=dummy&logoWidth=100")).andReturn()))
                .andExpect(content().string(equalTo(Badge.builder().message("1").style(Style.Flat).label("custom").color("black").labelColor("white").links(new String[]{"left.silentsoft.org", "right.silentsoft.org"}).logo("dummy").logoWidth(100).build())));

        mvc.perform(asyncDispatch(mvc.perform(get("/a.test.com.svg?style=flat-square&label=custom&color=black&labelColor=white&link=left.silentsoft.org&link=right.silentsoft.org&logo=dummy&logoWidth=100")).andReturn()))
                .andExpect(content().string(equalTo(Badge.builder().message("2").style(Style.FlatSquare).label("custom").color("black").labelColor("white").links(new String[]{"left.silentsoft.org", "right.silentsoft.org"}).logo("dummy").logoWidth(100).build())));

        mvc.perform(asyncDispatch(mvc.perform(get("/a.test.com.svg?style=for-the-badge&label=custom&color=black&labelColor=white&link=left.silentsoft.org&link=right.silentsoft.org&logo=dummy&logoWidth=100")).andReturn()))
                .andExpect(content().string(equalTo(Badge.builder().message("3").style(Style.ForTheBadge).label("custom").color("black").labelColor("white").links(new String[]{"left.silentsoft.org", "right.silentsoft.org"}).logo("dummy").logoWidth(100).build())));

        mvc.perform(asyncDispatch(mvc.perform(get("/a.test.com.svg?style=plastic&label=custom&color=black&labelColor=white&link=left.silentsoft.org&link=right.silentsoft.org&logo=dummy&logoWidth=100")).andReturn()))
                .andExpect(content().string(equalTo(Badge.builder().message("4").style(Style.Plastic).label("custom").color("black").labelColor("white").links(new String[]{"left.silentsoft.org", "right.silentsoft.org"}).logo("dummy").logoWidth(100).build())));

        mvc.perform(asyncDispatch(mvc.perform(get("/a.test.com.svg?style=social&label=custom&color=black&labelColor=white&link=left.silentsoft.org&link=right.silentsoft.org&logo=dummy&logoWidth=100")).andReturn()))
                .andExpect(content().string(equalTo(Badge.builder().message("5").style(Style.Social).label("custom").color("black").labelColor("white").links(new String[]{"left.silentsoft.org", "right.silentsoft.org"}).logo("dummy").logoWidth(100).build())));


        mvc.perform(asyncDispatch(mvc.perform(get("/b.test.com.svg?view=total&style=flat&label=custom&color=black&labelColor=white&link=left.silentsoft.org&link=right.silentsoft.org&logo=dummy&logoWidth=100")).andReturn()))
                .andExpect(content().string(equalTo(Badge.builder().message("1").style(Style.Flat).label("custom").color("black").labelColor("white").links(new String[]{"left.silentsoft.org", "right.silentsoft.org"}).logo("dummy").logoWidth(100).build())));

        mvc.perform(asyncDispatch(mvc.perform(get("/b.test.com.svg?view=total&style=flat-square&label=custom&color=black&labelColor=white&link=left.silentsoft.org&link=right.silentsoft.org&logo=dummy&logoWidth=100")).andReturn()))
                .andExpect(content().string(equalTo(Badge.builder().message("2").style(Style.FlatSquare).label("custom").color("black").labelColor("white").links(new String[]{"left.silentsoft.org", "right.silentsoft.org"}).logo("dummy").logoWidth(100).build())));

        mvc.perform(asyncDispatch(mvc.perform(get("/b.test.com.svg?view=total&style=for-the-badge&label=custom&color=black&labelColor=white&link=left.silentsoft.org&link=right.silentsoft.org&logo=dummy&logoWidth=100")).andReturn()))
                .andExpect(content().string(equalTo(Badge.builder().message("3").style(Style.ForTheBadge).label("custom").color("black").labelColor("white").links(new String[]{"left.silentsoft.org", "right.silentsoft.org"}).logo("dummy").logoWidth(100).build())));

        mvc.perform(asyncDispatch(mvc.perform(get("/b.test.com.svg?view=total&style=plastic&label=custom&color=black&labelColor=white&link=left.silentsoft.org&link=right.silentsoft.org&logo=dummy&logoWidth=100")).andReturn()))
                .andExpect(content().string(equalTo(Badge.builder().message("4").style(Style.Plastic).label("custom").color("black").labelColor("white").links(new String[]{"left.silentsoft.org", "right.silentsoft.org"}).logo("dummy").logoWidth(100).build())));

        mvc.perform(asyncDispatch(mvc.perform(get("/b.test.com.svg?view=total&style=social&label=custom&color=black&labelColor=white&link=left.silentsoft.org&link=right.silentsoft.org&logo=dummy&logoWidth=100")).andReturn()))
                .andExpect(content().string(equalTo(Badge.builder().message("5").style(Style.Social).label("custom").color("black").labelColor("white").links(new String[]{"left.silentsoft.org", "right.silentsoft.org"}).logo("dummy").logoWidth(100).build())));


        mvc.perform(asyncDispatch(mvc.perform(get("/c.test.com.svg?view=today-total&style=flat&label=custom&color=black&labelColor=white&link=left.silentsoft.org&link=right.silentsoft.org&logo=dummy&logoWidth=100")).andReturn()))
                .andExpect(content().string(equalTo(Badge.builder().message("1 / 1").style(Style.Flat).label("custom").color("black").labelColor("white").links(new String[]{"left.silentsoft.org", "right.silentsoft.org"}).logo("dummy").logoWidth(100).build())));

        mvc.perform(asyncDispatch(mvc.perform(get("/c.test.com.svg?view=today-total&style=flat-square&label=custom&color=black&labelColor=white&link=left.silentsoft.org&link=right.silentsoft.org&logo=dummy&logoWidth=100")).andReturn()))
                .andExpect(content().string(equalTo(Badge.builder().message("2 / 2").style(Style.FlatSquare).label("custom").color("black").labelColor("white").links(new String[]{"left.silentsoft.org", "right.silentsoft.org"}).logo("dummy").logoWidth(100).build())));

        mvc.perform(asyncDispatch(mvc.perform(get("/c.test.com.svg?view=today-total&style=for-the-badge&label=custom&color=black&labelColor=white&link=left.silentsoft.org&link=right.silentsoft.org&logo=dummy&logoWidth=100")).andReturn()))
                .andExpect(content().string(equalTo(Badge.builder().message("3 / 3").style(Style.ForTheBadge).label("custom").color("black").labelColor("white").links(new String[]{"left.silentsoft.org", "right.silentsoft.org"}).logo("dummy").logoWidth(100).build())));

        mvc.perform(asyncDispatch(mvc.perform(get("/c.test.com.svg?view=today-total&style=plastic&label=custom&color=black&labelColor=white&link=left.silentsoft.org&link=right.silentsoft.org&logo=dummy&logoWidth=100")).andReturn()))
                .andExpect(content().string(equalTo(Badge.builder().message("4 / 4").style(Style.Plastic).label("custom").color("black").labelColor("white").links(new String[]{"left.silentsoft.org", "right.silentsoft.org"}).logo("dummy").logoWidth(100).build())));

        mvc.perform(asyncDispatch(mvc.perform(get("/c.test.com.svg?view=today-total&style=social&label=custom&color=black&labelColor=white&link=left.silentsoft.org&link=right.silentsoft.org&logo=dummy&logoWidth=100")).andReturn()))
                .andExpect(content().string(equalTo(Badge.builder().message("5 / 5").style(Style.Social).label("custom").color("black").labelColor("white").links(new String[]{"left.silentsoft.org", "right.silentsoft.org"}).logo("dummy").logoWidth(100).build())));
    }

    @Test
    public void extraCountTest() throws Exception {
        {
            mvc.perform(asyncDispatch(mvc.perform(get("/x.test.com.svg")).andReturn()))
                    .andExpect(content().string(equalTo(Badge.builder().label("hits").message("1").build())));

            mvc.perform(asyncDispatch(mvc.perform(get("/x.test.com.svg?extraCount=100")).andReturn()))
                    .andExpect(content().string(equalTo(Badge.builder().label("hits").message(String.valueOf(2 + 100)).build())));

            mvc.perform(asyncDispatch(mvc.perform(get("/x.test.com.svg?extraCount=1000")).andReturn()))
                    .andExpect(content().string(equalTo(Badge.builder().label("hits").message("1,003").build())));

            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            HitsMigrationEntity entity = new HitsMigrationEntity();
            entity.setUrn("x.test.com");
            entity.setExtraCount(10_000);
            entity.setCreatedAt(timestamp);
            entity.setUpdatedAt(timestamp);
            hitsMigrationRepository.save(entity);

            mvc.perform(asyncDispatch(mvc.perform(get("/x.test.com.svg")).andReturn()))
                    .andExpect(content().string(equalTo(Badge.builder().label("hits").message("10,004").build())));

            // The extraCount parameter has a higher priority than database data.
            mvc.perform(asyncDispatch(mvc.perform(get("/x.test.com.svg?extraCount=20000")).andReturn()))
                    .andExpect(content().string(equalTo(Badge.builder().label("hits").message("20,005").build())));
        }
        {
            mvc.perform(asyncDispatch(mvc.perform(get("/z.test.com.svg?view=today-total")).andReturn()))
                    .andExpect(content().string(equalTo(Badge.builder().label("hits").message("1 / 1").build())));

            mvc.perform(asyncDispatch(mvc.perform(get("/z.test.com.svg?view=today-total&extraCount=100")).andReturn()))
                    .andExpect(content().string(equalTo(Badge.builder().label("hits").message("2 / ".concat(String.valueOf(2 + 100))).build())));

            mvc.perform(asyncDispatch(mvc.perform(get("/z.test.com.svg?view=today-total&extraCount=1000")).andReturn()))
                    .andExpect(content().string(equalTo(Badge.builder().label("hits").message("3 / 1,003").build())));

            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            HitsMigrationEntity entity = new HitsMigrationEntity();
            entity.setUrn("z.test.com");
            entity.setExtraCount(10_000);
            entity.setCreatedAt(timestamp);
            entity.setUpdatedAt(timestamp);
            hitsMigrationRepository.save(entity);

            mvc.perform(asyncDispatch(mvc.perform(get("/z.test.com.svg?view=today-total")).andReturn()))
                    .andExpect(content().string(equalTo(Badge.builder().label("hits").message("4 / 10,004").build())));

            // The extraCount parameter has a higher priority than database data.
            mvc.perform(asyncDispatch(mvc.perform(get("/z.test.com.svg?view=today-total&extraCount=20000")).andReturn()))
                    .andExpect(content().string(equalTo(Badge.builder().label("hits").message("5 / 20,005").build())));
        }
    }

}
