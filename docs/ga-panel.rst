ga-panel
========

This is a main component that generates a simple gentelella panel.

.. image:: images/ga-panel.png

Binding reference
-----------------

- ``panel-title``: The panel title (string)
- ``panel-subtitle``: The panel subtitle displayed in smaller font next to the title (string)
- ``panel-query``: Whether to show a small input text box usually for filtering (boolean)
- ``panel-query-string``: A controller variable to hold the ``panel-query`` input (variable)
- ``panel-add-record-url``: A url to direct for adding a record. If provided a + icon will be available (string)

Transclude
----------

The component will present any content transcluded.

Controller
----------

The component will initiate the necessary jquery required by gentelella as well.

Code sample
-----------

Template:

::

  <ga-panel panel-title="Products"
            panel-query="true"
            panel-query-string="$ctrl.query"
            panel-add-record-url="#!/products/add">
    <table class="table table-hover dataTable">
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
      </tr>
      </thead>
      <tbody>
      <tr ng-repeat="product in $ctrl.products | filter:$ctrl.query">
        <th scope="row"><a href="#!/products/{{ product._id }}">{{ $index + 1 }}</a></th>
        <td><a href="#!/products/{{ product._id }}">{{ product.name }}</a></td>
      </tr>
      </tbody>
    </table>
  </ga-panel>

Reference_

.. _Reference: https://github.com/Wtower/generator-makrina/blob/master/generators/angular-component-list/templates/_object-name_-list.template.html