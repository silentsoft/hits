<h1 align="center">
  Hits</br>
  <a href="https://status.hits.sh"><img alt="Uptime Robot status" src="https://img.shields.io/uptimerobot/status/m788691469-6cb5e6a1ce844e9f64a4b046"></a>
  <a href="https://status.hits.sh"><img alt="Uptime Robot ratio (30 days)" src="https://img.shields.io/uptimerobot/ratio/m788691469-6cb5e6a1ce844e9f64a4b046"></a>
</h1>
<h3 align="center">
  <a href="https://hits.sh"><img src=".images/hits-readme.png"/></a>
</h3>

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
  <a href="https://hits.sh/github.com/silentsoft/hits/"><img alt="Hits" src="https://hits.sh/github.com/silentsoft/hits.svg"/></a>
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

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please note we have a [CODE_OF_CONDUCT](https://github.com/silentsoft/hits/blob/main/CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

## License
Please refer to [LICENSE](https://github.com/silentsoft/hits/blob/main/LICENSE.txt) and [NOTICE](https://github.com/silentsoft/hits/blob/main/NOTICE.md).

## Thanks to
<a href="https://jb.gg/OpenSourceSupport"><img src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png" alt="JetBrains Logo (Main) logo." width="240"></a>
