import React, { FC, useState } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import Button from './src/button/button';
interface Props {
  code: string;
}

const Demo: FC<Props> = function ({ children, code }) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <div>{children}</div>
      <Button
        type='primary'
        onClick={() => {
          setVisible(visible => !visible);
        }}
      >
        {visible ? '收起代码' : '展开代码'}
      </Button>
      <div>
        {visible && (
          <Highlight {...defaultProps} code={code} language='jsx'>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={className} style={style}>
                {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        )}
      </div>
    </div>
  );
};
export default Demo;
