import test from 'tape';
import FomaWarning from '../index';

test('export', assert => {
    assert.true(
        typeof FomaWarning === 'function',
        'Should be typeof function'
    );

    assert.end();
});
