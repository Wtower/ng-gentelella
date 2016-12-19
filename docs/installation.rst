Installation
============

Use:

::

    npm install -S ng-gentelella

Static files
------------

Built files are conveniently provided under the `build/`_ directory.
These include all gentelella and ng-gentelella css and js files.

Otherwise, include the ``node_modules/ng-gentelella/gentelella`` js
files in your html or build system (eg gulp, `example gulpfile`_).
It is recommended that you include the templates path
``node_modules/*ng-gentelella/gentelella/**/*.html`` using
`some html2js module`_.

Alternatively you can expose the template files as ``/ng-gentelella`` with
``app.use('/ng-gentelella', express.static(path.join(__dirname, 'node_modules', 'ng-gentelella')));``.

Develop
-------

In your application, render a gentelella default index page as you
would.

Replace the main page content markup with an angular ``ng-view`` as in
`this example`_: ``<div ng-view class="view-frame"></div>``

Then develop proper Angular dashboard, list and detail components
as you would `normally do`_, and use the above components in their templates
to automate development.

.. _build/: https://github.com/Wtower/ng-gentelella/tree/master/build
.. _example gulpfile: https://github.com/Wtower/generator-makrina/blob/master/generators/app/templates/gulpfile.js
.. _some html2js module: http://stackoverflow.com/questions/21103724/angular-directive-templateurl-relative-to-js-file/41140644#41140644
.. _this example: https://github.com/Wtower/generator-makrina/blob/v0.3.0/generators/app/templates/views/admin.ejs#L139
.. _normally do: https://docs.angularjs.org/tutorial/step_04
