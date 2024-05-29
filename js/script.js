let fontCheckInterval;
const FONT_CHECK_INTERVAL = 100;
const MAX_FONTS_WAIT = 4000;

const isFontLoaded = (font) => {
    const probeWidth = font.$el.width();
    return probeWidth >= font.minWidth && probeWidth <= font.maxWidth
}

const onFontsReady = (callback) => {
    const fonts = $('.js__fontChecker').map((_, el) => {
        const $el = $(el);

        return {
            $el: $el,
            minWidth: +$el.attr('data-min-width'),
            maxWidth: +$el.attr('data-max-width'),
        }
    }).get();

    let timeSpent = 0;

    fontCheckInterval = setInterval(function() {
        const allFontsReady = fonts.every(isFontLoaded)

        // Если все шрифты уже готовы или
        // мы так и не дождались их загрузки,
        // отрисовываем страницу
        if (allFontsReady || timeSpent > MAX_FONTS_WAIT) {
            clearInterval(fontCheckInterval);
            callback();
        }

        timeSpent += FONT_CHECK_INTERVAL;
    }, FONT_CHECK_INTERVAL);
}

onFontsReady(() => {document.body.style.visibility = 'visible'});
