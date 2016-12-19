ga-resource
===========

``ga-resource`` is an `Angular service factory`_ wrapper.
Automates the CRUD operations using gentelella's PNotify and default REST responses.

.. _Angular service factory: https://docs.angularjs.org/api/ngResource/service/$resource

Methods
-------

``resource.getAndNotify(options)``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Retrieve an entity with ``$resource.get`` and notify on error.

::

         * @param options.getId: the entity id to retrieve, in object
         * @param options.url: the entity url
         *
         * @param options.error404.title: not found error title
         * @param options.error404.body: not found error body
         *
         * @param options.callbacks.err: additional error callback
         * @param options.callbacks.next: additional success callback
         *
         * @returns {*}: the entity from $resource.get

``resource.submitAndNotify(options)``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Save an entity with ``$resource.save`` and notify.

::

         * @param options.id: the entity id
         * @param options.entity: the entity to save
         * @param options.form: the ng-form to set pristine
         * @param options.url: the entity url
         *
         * @param options.success.title: submit success title
         * @param options.success.body: submit success body
         * @param options.error.title: submit fail title
         * @param options.error.conflict409: duplicate id fail body
         *
         * @param options.callbacks.err: additional error callback
         * @param options.callbacks.next: additional sucess callback
         *
         * @returns {*}: the saved entity

``resource.deleteAndNotify(options)``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Delete an entity and notify.

::

         * @param options.getId: the entity id to delete, in object
         * @param options.url: the entity url
         *
         * @param options.success.title: success title
         * @param options.success.body: success body
         * @param options.error.title: fail title
         *
         * @param options.callbacks.err: additional error callback
         * @param options.callbacks.next: additional sucess callback

Code sample
-----------

`Example in factory`_

::

  angular
    .module('core.products')
    .factory('Product', ['gaResource',
      function ($resource) {
        return $resource('api/products');
      }
    ]);

`Example of factory use inside a controller`_

::

        self.product = Product.getAndNotify({
          getId: {productId: self.productId},
          url: '/products',
          error404: {
            title: 'Product not found',
            body: 'The product cannot be found.'
          }
        });

        self.submitProduct = function() {
          self.product = Product.submitAndNotify({
            id: self.productId,
            entity: self.product,
            form: self.productEdit,
            url: '/products/',
            success: {
              title: 'Product saved',
              body: 'Product saved successfully.'
            },
            error: {
              title: 'Product not saved',
              conflict409: 'Product already exists'
            },
            callbacks: {next: self.getProduct}
          });
        };

        self.deleteProduct = function() {
          Product.deleteAndNotify({
            getId: {productId: self.productId},
            url: '/products',
            success: {
              title: 'Product deleted',
              body: 'Product deleted successfully.'
            },
            error: {title: 'Product not deleted'}
          });
        };

.. _Example in factory: https://github.com/Wtower/generator-makrina/blob/master/generators/angular-core-service/templates/_object-name_.service.js
.. _Example of factory use inside a controller: https://github.com/Wtower/generator-makrina/blob/master/generators/angular-component-detail/templates/_object-name_-detail.component.js.ejs#L14
