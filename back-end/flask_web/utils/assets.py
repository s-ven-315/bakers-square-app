from flask_assets import Bundle

bundles = {
    'home_js': Bundle(
        'js/vendor/jquery-3.3.1.js',
        'js/vendor/popper.js',
        'js/vendor/bootstrap-4.1.3.js',
        'js/main.js',
        filters='jsmin',
        output='gen/home.%(version)s.js'),

    'home_css': Bundle(
        'css/vendor/bootstrap-4.1.3.css',
        'css/main.css',
        filters='cssmin',
        output='gen/home.%(version)s.css'),
}
