import { html, TemplateResult } from 'lit';
import '../src/design-system.js';

export default {
  title: 'DesignSystem',
  component: 'design-system',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  header?: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({ header, backgroundColor = 'white' }: ArgTypes) => html`
  <design-system style="--design-system-background-color: ${backgroundColor}" .header=${header}></design-system>
`;

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
