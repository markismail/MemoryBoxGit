CKFinder.define({
    config: function (config) {
        // Use sample custom theme.
        config.themeCSS = 'skins/moono/ckfinder.css';

        // Use Moono skin icons.
        config.iconsCSS = 'skins/moono/icons.css';

        return config;
    },

    init: function (finder) {
        CKFinder.require(['jquery'], function (jQuery) {
            // Enforce black iconset.
            jQuery('body').addClass('ui-alt-icon');
        });
    }
});