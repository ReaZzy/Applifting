import UserMenu from '@src/feautures/UserMenu/UserMenu';
import { render } from '@src/utils/test-utils';

describe('<UserMenu />', () => {
  it('should be defined', () => {
    expect(UserMenu).toBeDefined();
  });
  it('snapshot', () => {
    const { asFragment } = render(<UserMenu />);
    expect(asFragment()).toMatchSnapshot();
  });
});
