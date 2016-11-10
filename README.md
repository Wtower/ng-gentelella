ng-gentelella
=============

Easily create an administration interface using Angular components
that are based on the markup by [Gentelella](https://github.com/puikinsh/gentelella)
bootstrap template.

Features and limitations
------------------------

The project offers a small number of components that aim to directly reduce the development time of an
admin interface. It currently not yet offers a wide number of components to fully automate the
development of a gentelella interface.

Components
----------

### ga-panel

This is a main component that generates a simple gentelella panel.

### ga-panel-table-form

`ga-panel-table-form` together with `ga-panel-table-form-body` offer a more advanced panel
that can be used to display a table of records. Upon clicking on a record, an accordion with
a form for that record opens.

### ga-panel-actions

This offers a small panel with basic form buttons: Save, Close/cancel, delete.

### ga-resource

Automate the CRUD operations using gentelella's PNotify and default REST responses.

### form-field-text

Render a standard gentelella form textbox.

### form-field-select

Render a gentelella form select box. Depending on the options provided this can be extended to multiple selection.

### form-field-checkbox

Render a checkbox.

### form-field-image

Provide an image upload field. This relies on `ng-file-upload`.

How to use
----------

In your application, render a gentelella default index page as you would.

Replace the main page content markup with an angular `ng-view` as in [this example]
(https://github.com/Wtower/generator-makrina/blob/v0.3.0/generators/app/templates/views/admin.ejs#L139).

Then develop proper Angular dashboard, list and detail components as you would normally do,
and use the above components in their templates to automate development.

Alternatives
------------

- [angular2-webpack-starter-gentelella](https://github.com/kmkatsma/angular2-webpack-starter-gentelella)
- [ng-admin](https://github.com/marmelab/ng-admin): one of the most well developed angular admin with a
  configuration system that is too advanced for my taste.
- [commercial angular templates](https://colorlib.com/wp/angularjs-admin-templates/) and
  [inspinia commercial template](https://wrapbootstrap.com/theme/inspinia-responsive-admin-theme-WB0R5L90S)
