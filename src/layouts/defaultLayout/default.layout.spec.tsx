import DefaultLayout from '@src/layouts/defaultLayout/Default.layout';
import { render } from '@src/utils/tests/test-utils';

describe('<DefaultLayout />', () => {
  it('should be defined', () => {
    expect(DefaultLayout).toBeDefined();
  });
  it('snapshot', () => {
    const { asFragment } = render(<DefaultLayout />);
    expect(asFragment()).toMatchSnapshot();
  });
});
