import { useEffect, useState } from 'react';
import Textarea from '@mui/joy/Textarea';
import { Button, Container, FormHelperText, Grid, Typography } from '@mui/joy';
import convertHtmlToBlog from './utils/convertHtmlToBlog';
import copyToClipboard from './utils/copyToClipboard';

const EmailConverter = () => {
  const [mailchimpHtml, setMailchimpHtml] = useState('');
  const [convertedHtml, setConvertedHtml] = useState('');
  const [isCopied, setCopied] = useState(false);

  const handleChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = target;
    setMailchimpHtml(value);
  };

  const handleConvertHtml = () => {
    const convertedHtml = convertHtmlToBlog(mailchimpHtml);
    setConvertedHtml(convertedHtml);
  };

  const deleteMailchimpHtml = () => setMailchimpHtml('');
  const deleteConvertedHtml = () => setConvertedHtml('');

  const handleCopy = () => {
    setCopied(true);
    copyToClipboard(convertedHtml);
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isCopied) {
      timeout = setTimeout(() => {
        setCopied(false);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [isCopied]);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Textarea
            minRows={10}
            maxRows={10}
            placeholder="Paste HTML from Mailchimp here."
            value={mailchimpHtml}
            onChange={handleChange}
          />
        </Grid>
        <Grid
          container
          xs={12}
          display="flex"
          justifyContent="center"
          spacing={2}
        >
          <Grid>
            <Button
              type="button"
              onClick={handleConvertHtml}
              disabled={!mailchimpHtml.length}
            >
              Convert
            </Button>
          </Grid>
          <Grid>
            <Button
              type="button"
              color="neutral"
              onClick={deleteMailchimpHtml}
              disabled={!mailchimpHtml.length}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
        <Grid xs={12}>
          <Textarea
            minRows={10}
            maxRows={10}
            placeholder="Converted code for Shopify blog will appear here."
            value={convertedHtml}
          />
          {convertedHtml.length ? (
            <FormHelperText>
              <Typography color={isCopied ? 'success' : 'neutral'}>
                {isCopied
                  ? 'Copied to clipboard!'
                  : 'Copy me into a new Shopify blog post.'}
              </Typography>
            </FormHelperText>
          ) : null}
        </Grid>
        <Grid
          container
          xs={12}
          display="flex"
          justifyContent="center"
          spacing={2}
        >
          <Grid>
            <Button
              type="button"
              onClick={handleCopy}
              disabled={!convertedHtml.length}
            >
              Copy
            </Button>
          </Grid>
          <Grid>
            <Button
              type="button"
              color="neutral"
              onClick={deleteConvertedHtml}
              disabled={!convertedHtml.length}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmailConverter;
