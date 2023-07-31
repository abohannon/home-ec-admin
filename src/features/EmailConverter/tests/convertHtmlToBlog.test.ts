import { expect, test } from 'vitest';
import convertHtmlToBlog from '../utils/convertHtmlToBlog';
import { mockHtml } from './mockHtml';
/**
 * @vitest-environment jsdom
 */
test('parses html', () => {
  const result = convertHtmlToBlog(mockHtml);

  expect(result).toContain('<script>');
  expect(result).toContain('</script>');
  expect(result).toContain('<style type="text/css">');
  expect(result).toContain('</style>');
  expect(result).toContain('<center>');
  expect(result).toContain('</center>');
  expect(result).not.toContain(`id="templateFooter"`);
  expect(result).not.toContain(`<html>`);
  expect(result).not.toContain(`</html>`);
});
