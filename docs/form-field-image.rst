form-field-image
================

Provide an image upload field. This relies on `ng-file-upload`_.

.. image:: images/form-field-image.png

Binding reference
-----------------

- ``field-id``: A unique HTML id to associate label and input (string)
- ``field-label``: The label text (string)
- ``field-width``: The width of the field in bootstrap columns (1-12), default 9 (integer)
- ``field-label-width``: The width of the label in bootstrap columns (1-12), default 3 (integer)
- ``field-required``: Whether the field is required, default false (boolean)
- ``field-media-url``: The url where the image filename value resides (string)
- ``field-title``: The ``<img title>`` (string)
- ``field-data``: A relevant entity data to send with the upload, optional (object)
- ``field-value``: A controller variable to return the ``ng-model`` input value (variable)

Transclude
----------

The controller allows transclude to replace the thumbnail markup.

Controller
----------

The controller uploads the file to ``api/uploads`` using `ng-file-upload`_.

Code sample
-----------

::

              <form-field-image field-id="image-{{ $index }}-image"
                                field-media-url="/media/product"
                                field-title="{{ image.title || 'Product image' }}"
                                field-data="{_id: $ctrl.productId, entity: 'product'}"
                                field-value="image.image"></form-field-image>

`Reference`_

.. _Reference: https://github.com/Wtower/phoebe4/blob/34d39c43867c231936a1ea155dae7f51e05c792a/angular/product-detail/product-detail.template.html#L241
.. _ng-file-upload: https://github.com/danialfarid/ng-file-upload
