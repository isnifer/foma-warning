import './utils/jsdom';
import test from 'tape';
import { render, TestUtils } from './utils/render';
import FomaWarning from '../index';

test('export', assert => {
    assert.true(
        typeof FomaWarning === 'function',
        'Should be typeof function'
    );

    assert.end();
});

test('items + hidden', assert => {
    let props = {
        visible: false,
        items: [
            {
                fieldName: 'test',
                name: 'test'
            },
            {
                fieldName: 'test',
                name: 'test'
            }
        ]
    };

    var Component = render(FomaWarning, props);

    assert.equal(Component, null, 'Component hidden, null');

    assert.end();
});

test('items + visible', assert => {
    let props = {
        visible: true,
        items: [
            {
                fieldName: 'test',
                name: 'test'
            },
            {
                fieldName: 'test2',
                name: 'test2'
            }
        ]
    };

    var Component = render(FomaWarning, props);

    assert.equal(typeof Component.props.children, 'object', 'There is one field');

    assert.end();
});

test('no items + visible', assert => {
    let props = {
        visible: true
    };

    var Component = render(FomaWarning, props);

    assert.equal(Component, null, 'There is nothing to view, null');

    assert.end();
});
