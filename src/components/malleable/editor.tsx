import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { ValidElementTypes } from './index';

interface EditorProps {
  As: ValidElementTypes;
  id: string;
  className: string;
  initialText: string;
  noop?: boolean;
}

const Editor: React.FC<EditorProps> = ({ As, id, className, initialText, noop }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: initialText }],
    },
  ]);

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  if (noop) return null;

  return (
    <As id={id} className={className}>
      <Slate
        editor={editor}
        value={value}
        onChange={value => {
          setValue(value);
          const content = value[0]?.children?.[0]?.text || '';
          window.parent.postMessage(
            { type: 'preview-update', id, content },
            '*'
          );
        }}
      >
        <Editable
          renderElement={renderElement}
          placeholder="Enter some text..."
        />
      </Slate>
    </As>
  );
};

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>;
};

export default Editor;
