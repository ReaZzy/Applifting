import Spinner from '@src/components/Spinner/Spinner';
import { render } from '@src/utils/tests/test-utils';

describe('<Spinner />', () => {
  it('should be defined', () => {
    expect(Spinner).toBeDefined();
  });
  it('snapshot', () => {
    const { asFragment } = render(<Spinner />);
    expect(asFragment()).toMatchSnapshot();
  });
});
