import Navbar from '@src/components/Navbar/Navbar';
import { render } from '@src/utils/tests/test-utils';

describe('<Navbar />', () => {
  it('should be defined', () => {
    expect(Navbar).toBeDefined();
  });
  it('snapshot', () => {
    const { asFragment } = render(<Navbar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
