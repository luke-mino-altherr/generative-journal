import CollapsedNav from './CollapsedNav';
import ExpandedNav from './ExpandedNav';

const Navigation = () => {
  return (
    <div>
      <div className="hidden md:block">
        <ExpandedNav />
      </div>
      <div className="block md:hidden">
        <CollapsedNav />
      </div>
    </div>
  );
};

export default Navigation;
