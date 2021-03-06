var Shortcode = require('../../../js/src/models/shortcode');
var ShortcodeAttribute = require('../../../js/src/models/shortcode-attribute');
var EditAttributeField = require('../../../js/src/views/edit-attribute-field');
var sui = require('../../../js/src/utils/sui');
var hooks = require('../../../lib/wp-js-hooks/wp-js-hooks.js');
var _ = require('underscore');
var $ = require('jquery');

describe( 'Edit Attribute Field', function(){
	var editAttributeFieldView, shortcodeAttributeModel, attrData, shortcodeModel, shortcodeData, templateFunc;

	shortcodeData = {
		label: 'Test Label',
		shortcode_tag: 'test_shortcode',
		attrs: [
			{
				attr:        'attr',
				label:       'Attribute',
				type:        'text',
				value:       'test value',
				placeholder: 'test placeholder'
			}
		],
		inner_content: {
			value: 'test content',
		},
	};

	shortcodeModel = new Shortcode( shortcodeData );

	shortcodeAttributeModel = new ShortcodeAttribute(
		shortcodeModel.get('attrs').models[0].attributes
	);

	editAttributeFieldView = new EditAttributeField({ model: shortcodeAttributeModel });
	editAttributeFieldView.shortcode = shortcodeModel;
	editAttributeFieldView.template = function( data ) {};

	it( 'should set data and trigger callbacks on initial render', function(){
		spyOn( editAttributeFieldView, 'triggerCallbacks' );
		spyOn( editAttributeFieldView, 'template' );

		editAttributeFieldView.render();
		expect( editAttributeFieldView.triggerCallbacks ).toHaveBeenCalled();
		expect( editAttributeFieldView.template ).toHaveBeenCalled();
	});

	xit( 'triggers callbacks with expected values', function(){
		wp.shortcake.hooks.addAction( 'test_shortcode.attr1', 'attr1RenderCallback' );
		window.attr1RenderCallback = function(){};

		spyOn( window, 'attr1RenderCallback' );
	});

});
