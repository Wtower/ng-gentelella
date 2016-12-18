/**
 * Created by gkarak on 2/10/2016.
 *
 * Override default $resource service to provide default callbacks for http success and fail.
 * http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
 */

angular
  .module('gaResource')
  .factory('gaResource', ['$resource', '$location',
    function ($resource, $location) {
      return function (url, params, methods) {
        var resource = $resource(url, params, methods);

        /**
         * Retrieve an entity with $resource.get and notify on error
         *
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
         */
        resource.getAndNotify = function(options) {
          getOptions = options;
          return resource.get(options.getId, function(data) {
            if (options.callbacks) options.callbacks.next();
          }, function(error) {
            console.log(error);
            $location.path(options.url);
            new PNotify({
              title: options.error404.title,
              text: options.error404.body,
              type: 'error',
              styling: 'bootstrap3'
            });
            if (options.callbacks) options.callbacks.err();
          });
        };

        /**
         * Save an entity with $resource.save and notify
         *
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
         */
        resource.submitAndNotify = function(options) {
          var entity = resource.save(options.entity, function () {
            new PNotify({
              title: options.success.title,
              text: options.success.body,
              type: 'success',
              styling: 'bootstrap3'
            });
            options.form.$setPristine();
            if (!options.id) $location.path(options.url + '/' + entity._id);
            else if (options.callbacks && options.callbacks.next) options.callbacks.next();
          }, function (error) {
            if (error.status == 409) {
              new PNotify({
                title: options.error.title,
                text: '[' + error.data + ']: ' + options.error.conflict409,
                type: 'error',
                styling: 'bootstrap3'
              });
            }
            else {
              new PNotify({
                title: options.error.title,
                text: error.data,
                type: 'error',
                styling: 'bootstrap3'
              });
            }
            if (options.callbacks && options.callbacks.err) options.callbacks.err();
          });
          return entity;
        };

        /**
         * Delete an entity and notify
         *
         * @param options.getId: the entity id to delete, in object
         * @param options.url: the entity url
         *
         * @param options.success.title: success title
         * @param options.success.body: success body
         * @param options.error.title: fail title
         *
         * @param options.callbacks.err: additional error callback
         * @param options.callbacks.next: additional sucess callback
         */
        resource.deleteAndNotify = function (options) {
          if (!confirm('Are you sure you want to delete this?')) return;
          resource.delete(options.getId, function() {
            new PNotify({
              title: options.success.title,
              text: options.success.body,
              type: 'success',
              styling: 'bootstrap3'
            });
            $location.path(options.url);
            if (options.callbacks && options.callbacks.next) options.callbacks.next();
          }, function(error) {
            new PNotify({
              title: options.error.title,
              text: error.data,
              type: 'error',
              styling: 'bootstrap3'
            });
            if (options.callbacks && options.callbacks.err) options.callbacks.err();
          });
        };

        return resource;
      }
    }
  ]);
