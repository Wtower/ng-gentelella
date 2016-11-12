ng-gentelella
=============

[![NPM version][npm-image]][npm-url] 
[![Dependency Status][daviddm-image]][daviddm-url] 
[![npm](https://img.shields.io/npm/dt/ng-gentelella.svg?maxAge=2592000)](https://www.npmjs.com/package/ng-gentelella)

[npm-image]: https://badge.fury.io/js/ng-gentelella.svg
[npm-url]: https://npmjs.org/package/ng-gentelella
[daviddm-image]: https://david-dm.org/Wtower/ng-gentelella.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Wtower/ng-gentelella

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

[Example](https://github.com/Wtower/generator-makrina/blob/master/generators/angular-component-list/templates/_object-name_-list.template.html)

### ga-panel-table-form

`ga-panel-table-form` together with `ga-panel-table-form-body` offer a more advanced panel
that can be used to display a table of records. Upon clicking on a record, an accordion with
a form for that record opens.

### ga-panel-actions

This offers a small panel with basic form buttons: Save, Close/cancel, delete.

[Example](https://github.com/Wtower/generator-makrina/blob/master/generators/angular-component-detail/templates/_object-name_-detail.template.html#L19)

### ga-resource

Automate the CRUD operations using gentelella's PNotify and default REST responses.

[Example in factory](https://github.com/Wtower/generator-makrina/blob/master/generators/angular-core-service/templates/_object-name_.service.js)

[Example of factory use in controller](https://github.com/Wtower/generator-makrina/blob/master/generators/angular-component-detail/templates/_object-name_-detail.component.js.ejs#L14)

### ga-paginate

Provide a list paginator.

### ga-dashboard-counter

Provide a large counter panel for dashboard as in 
[Gentelella index2](https://colorlib.com/polygon/gentelella/index2.html). 

[Example](https://github.com/Wtower/generator-makrina/blob/master/generators/angular-app/templates/dashboard/dashboard.template.html)

### form-field-text

Render a standard gentelella form textbox.

[Example](https://github.com/Wtower/generator-makrina/blob/master/generators/angular-component-detail/templates/_object-name_-detail.template.html#L11)

### form-field-select

Render a gentelella form select box. Depending on the options provided this can be extended to multiple selection.

### form-field-checkbox

Render a checkbox.

### form-field-image

Provide an image upload field. This relies on `ng-file-upload`.

How to use
----------

### Installation

Use:

    npm install -S ng-gentelella

Then include the `node_modules/ng-gentelella/gentelella` js files in your html or build system (eg gulp).

Also make the above folder public or have a build system copy its html files in order for the templates to
be available for Angular. Expose them as `/static/gentelella`:

```
app.use('/static/ng-gentelella', express.static(path.join(__dirname, 'node_modules', 'ng-gentelella', 'gentelella')));
```

### Develop

In your application, render a gentelella default index page as you would.

Replace the main page content markup with an angular `ng-view` as in [this example]
(https://github.com/Wtower/generator-makrina/blob/v0.3.0/generators/app/templates/views/admin.ejs#L139).

Then develop proper Angular dashboard, list and detail components 
as you would [normally do](https://docs.angularjs.org/tutorial/step_04),
and use the above components in their templates to automate development.

Alternatives
------------

- [angular2-webpack-starter-gentelella](https://github.com/kmkatsma/angular2-webpack-starter-gentelella)
- [ng-admin](https://github.com/marmelab/ng-admin): one of the most well developed angular admin with a
  configuration system that is too advanced for my taste.
- [commercial angular templates](https://colorlib.com/wp/angularjs-admin-templates/) and
  [inspinia commercial template](https://wrapbootstrap.com/theme/inspinia-responsive-admin-theme-WB0R5L90S)
