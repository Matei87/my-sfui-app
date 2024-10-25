import {
  SfIconFavorite,
  SfIconPerson,
  SfIconClose,
  SfButton,
  SfDrawer,
  SfListItem,
  SfIconChevronRight,
  SfIconMenu,
  SfCounter,
  SfIconArrowBack,
  useDropdown,
  useTrapFocus,
  useDisclosure,
  SfIconSearch,
  SfIconLocationOn,
  SfIconExpandMore,
} from '@storefront-ui/react';
import {
  type FocusEvent,
  useRef,
  useState,
  useMemo,
  createRef,
  RefObject,
} from 'react';

import { Link } from 'react-router-dom';

import ShoppingCart from './ShoppingCart';

const actionItems1: Node = {
  key: 'root1',
  value: { label: '', counter: 0 },
  isLeaf: false,
  children: [
    {
      key: 'uk',
      value: {
        label: 'UK',
        counter: 200,
      },
      isLeaf: false,
    },
    {
      key: 'en',
      value: {
        label: 'EN',
        counter: 200,
      },
      isLeaf: false,
    },
    {
      key: 'contactus',
      value: {
        label: 'CONTACT US',
        counter: 300,
      },
      isLeaf: false,
    },
    {
      key: 'services',
      value: {
        label: 'SERVICES',
        counter: 310,
      },
      isLeaf: false,
    },
  ],
};

const actionItems = [
  {
    icon: <SfIconSearch />,
    label: 'Search',
    ariaLabel: 'Search',
    role: 'button',
  },
  {
    icon: <SfIconPerson />,
    label: '',
    ariaLabel: 'Log in',
    role: 'login',
  },

  {
    icon: <SfIconLocationOn />,
    label: '',
    ariaLabel: 'Location',
    role: 'location',
  },
  {
    icon: <SfIconFavorite />,
    label: '',
    ariaLabel: 'Wishlist',
    role: 'button',
  },
  {
    icon: <ShoppingCart />,
    label: '',
    ariaLabel: 'Cart',
    role: 'button',
  },
];

type Node = {
  key: string;
  value: {
    label: string;
    counter: number;
    link?: string;
    banner?: string;
    bannerTitle?: string;
  };
  children?: Node[];
  isLeaf: boolean;
};

const content: Node = {
  key: 'root',
  value: { label: '', counter: 0 },
  isLeaf: false,
  children: [
    {
      key: 'High jewellery',
      value: {
        label: 'High jewellery',
        counter: 515,
      },
      isLeaf: false,
    },
    {
      key: 'jewellry',
      value: {
        label: 'jewellry',
        counter: 364,
      },
      isLeaf: false,
    },
    {
      key: 'watches',
      value: {
        label: 'watches',
        counter: 263,
      },
      isLeaf: false,
    },
    {
      key: 'art of living',
      value: {
        label: 'art of living',
        counter: 364,
      },
      isLeaf: false,
    },
    {
      key: 'the maison',
      value: {
        label: 'the maison',
        counter: 123,
      },
      isLeaf: false,
    },
    {
      key: 'News',
      value: {
        label: 'News',
        counter: 456,
      },
      isLeaf: false,
    },
  ],
};

const findNode = (keys: string[], node: Node): Node => {
  if (keys.length > 1) {
    const [currentKey, ...restKeys] = keys;
    return findNode(
      restKeys,
      node.children?.find((child) => child.key === currentKey) || node
    );
  }
  return node.children?.find((child) => child.key === keys[0]) || node;
};

export default function Navbar() {
  const drawerRef = useRef(null);
  const megaMenuRef = useRef(null);
  const [activeNode, setActiveNode] = useState<string[]>([]);

  const refsByKey = useMemo(() => {
    const buttonRefs: Record<string, RefObject<HTMLButtonElement>> = {};
    content.children?.forEach((item) => {
      buttonRefs[item.key] = createRef();
    });
    return buttonRefs;
  }, [content.children]);

  const { close, open, isOpen } = useDisclosure();
  const { refs, style } = useDropdown({
    isOpen,
    onClose: (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        refsByKey[activeNode[0]]?.current?.focus();
      }
      close();
    },
    placement: 'bottom-start',
    middleware: [],
    onCloseDeps: [activeNode],
  });

  const trapFocusOptions = {
    activeState: isOpen,
    arrowKeysUpDown: true,
    initialFocus: 'container',
  } as const;
  useTrapFocus(megaMenuRef, trapFocusOptions);
  useTrapFocus(drawerRef, trapFocusOptions);

  const activeMenu = findNode(activeNode, content);
  const bannerNode = findNode(activeNode.slice(0, 1), content);

  const handleOpenMenu = (menuType: string[]) => () => {
    setActiveNode(menuType);
    open();
  };

  const handleBack = () => {
    setActiveNode((menu) => menu.slice(0, menu.length - 1));
  };

  const handleNext = (key: string) => () => {
    setActiveNode((menu) => [...menu, key]);
  };

  const handleBlurWithin = (event: FocusEvent) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      close();
    }
  };

  return (
    <div className='w-full h-full'>
      <header className='relative' ref={refs.setReference}>
        <div className='flex flex-wrap justify-between items-center px-4 md:px-10 py-2 md:py-5 w-full border-0 bg-white text-black border-neutral-200 h-full md:z-10'>
          <nav className='flex flex-nowrap justify-between items-center gap-x-1 w-full'>
            <div>
              {actionItems1.children?.map((menuNode) => (
                <SfButton
                  key={menuNode.key}
                  variant='tertiary'
                  onMouseEnter={handleOpenMenu([menuNode.key])}
                  onClick={handleOpenMenu([menuNode.key])}
                  ref={refsByKey[menuNode.key]}
                  className='group mr-2 !text-neutral-900 hover:!bg-neutral-200 hover:!text-neutral-700 active:!bg-neutral-300 active:!text-neutral-900'
                >
                  <span>{menuNode.value.label}</span>
                  {(menuNode.key === 'uk' || menuNode.key === 'en') && (
                    <SfIconExpandMore className='hidden md:inline-flex' />
                  )}
                </SfButton>
              ))}
            </div>
            <Link to={'/'}>
              <picture>
                <svg
                  width='158'
                  height='44'
                  viewBox='0 0 158 44'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g clipPath='url(#clip0_1047_38698)'>
                    <path
                      d='M97.9297 33.1301L98.0697 32.8701L97.9297 33.1301Z'
                      fill='black'
                    />
                    <path
                      d='M110.975 16.9998C111.786 17.01 112.523 16.5292 112.84 15.7827C113.158 15.0362 112.993 14.1719 112.423 13.5948C111.853 13.0176 110.991 12.8418 110.241 13.1499C109.49 13.4579 109 14.1887 109 14.9999C109 16.0947 109.88 16.9862 110.975 16.9998Z'
                      fill='black'
                    />
                    <path
                      d='M53.005 25.9551C52.985 26.1551 53.005 25.9551 53.005 25.9551V25.9551Z'
                      fill='black'
                    />
                    <path
                      d='M155.124 22.0108C152.112 22.0108 146.162 26.7256 145.47 27.4414L148.532 22.0108H143.89C137.89 32.1808 125.397 42.0546 119.817 42.2521C114.878 42.5977 114.409 39.0184 116.064 34.8468C123.199 35.5626 135.816 28.256 131.792 22.8254C128.36 19.5424 119.397 23.0476 113.545 30.7244L113.125 31.3169L112.286 32.5758C110.383 34.9438 108.33 37.1865 106.138 39.29C100.755 44.5724 98.3355 41.4869 100.607 37.6608L109.496 22.2577H105.471C104.36 23.7634 99.0022 33.6372 90.237 39.833C85.2988 43.6097 81.4224 41.9806 84.8791 37.0684L93.5455 22.2577H98.4837L99.1257 21.5912H94.1875L99.4219 12.4086H94.9282C92.6073 16.3581 87.1506 25.5901 81.6939 27.9104C82.2733 27.0208 82.4939 25.9447 82.3112 24.8989C81.9852 23.6908 80.9406 22.8139 79.694 22.702C77.1465 22.6228 74.6828 23.617 72.904 25.442L74.8546 22.233H70.4349C66.5832 29.0706 56.3118 43.6838 50.6823 42.2768C49.1762 41.6103 49.0774 39.8083 50.6823 37.1424L59.571 22.0108H55.176C54.5588 22.9241 53.0526 25.7382 52.707 26.2812C52.3613 26.8243 52.707 26.5774 52.707 26.2812C52.707 25.985 52.707 26.2812 52.707 26.2812C52.9676 25.2304 52.799 24.119 52.2384 23.1927C51.6778 22.2663 50.7714 21.6012 49.7194 21.3443C49.044 21.2108 48.3583 21.1365 47.67 21.1222C43.3937 21.4222 39.3772 23.2849 36.3863 26.3553C33.4586 29.0099 31.0112 32.1497 29.1519 35.6367C20.1398 43.906 10.8807 44.375 7.86846 41.2894C4.85619 38.2038 3.39943 31.2428 9.34991 19.8386C11.4239 16.8271 19.2262 3.99115 30.4112 1.02901C38.7813 -1.19259 42.2134 3.49746 42.485 9.0021C43.9819 6.23198 45.7876 3.64008 47.8676 1.27586C46.1392 2.01639 42.2874 2.90503 40.4603 1.8436C35.0283 -1.61223 24.5841 -1.11854 11.2017 11.3224C-0.0325918 22.9735 -8.3287 45.6092 14.4362 43.8319C19.9653 42.7834 25.0942 40.2196 29.2507 36.4266C28.2137 40.3267 29.9173 43.2642 33.2506 43.8319C34.7541 43.9797 36.271 43.7594 37.6703 43.1901C40.2818 42.1471 42.7208 40.7157 44.9047 38.9444C43.8676 43.1901 50.4354 49.5587 62.5833 34.5505L56.9538 43.5851H62.0648C62.0648 43.5851 70.6325 28.4782 72.188 26.923C75.5213 22.4798 81.6199 21.6652 81.5458 24.7755C80.6449 24.2356 79.5009 24.3247 78.6945 24.9975C77.888 25.6703 77.5956 26.7795 77.9656 27.7623C78.1347 28.2984 78.5325 28.7323 79.052 28.9472C79.052 28.9472 81.9162 30.9219 88.7802 22.307L87.7926 24.0843C87.7926 24.0843 80.8545 36.0563 79.9656 37.7595C76.4348 44.4984 84.9038 45.1649 89.8419 40.8698C92.9674 38.4451 95.8755 35.7525 98.5331 32.8226L98.3602 33.1435C95.8912 37.4386 93.4221 41.8325 96.706 43.7332C99.1141 44.3974 101.695 43.8034 103.57 42.1534C106.42 39.7821 109.064 37.1726 111.471 34.3531C110.311 37.0437 109.224 41.4622 113.94 43.4616C116.405 44.1119 119.017 43.9029 121.347 42.8692C129.718 40.1292 140.409 27.8857 140.409 27.8857C140.409 27.8857 131.347 42.9433 131.051 43.4863H135.767C135.767 43.4863 142.285 32.4524 143.618 30.5763C147.174 24.973 154.902 21.1469 155.692 23.171C152.853 22.6032 152.137 26.8243 154.384 27.6883C157.989 28.9718 159.964 22.2083 155.124 22.0108ZM127.397 22.307C128.631 22.307 129.224 23.0476 129.1 24.7755C128.705 28.4782 123.224 34.6493 116.261 34.3777C118.656 28.6263 124.458 22.0108 127.397 22.2577V22.307ZM43.3985 39.29C42.4732 40.0515 41.4816 40.7289 40.4356 41.3141C33.7444 44.6959 32.2383 41.0179 33.0284 37.6361C34.1355 34.0246 35.9482 30.6686 38.3616 27.7623C40.1891 25.6393 42.422 23.9022 44.9294 22.6526C50.4848 19.9373 53.8674 23.3438 51.5712 28.2313C49.6641 32.4564 46.878 36.2264 43.3985 39.29Z'
                      fill='black'
                    />
                    <path
                      d='M97.9297 33.1199L98.0697 32.8799L97.9297 33.1199Z'
                      fill='black'
                    />
                  </g>
                  <defs>
                    <clipPath id='clip0_1047_38698'>
                      <rect width='158' height='44' fill='white' />
                    </clipPath>
                  </defs>
                </svg>
              </picture>
            </Link>

            <div>
              {actionItems.map((actionItem) => (
                <SfButton
                  className='text-white bg-transparent hover:bg-primary-800 hover:text-white active:bg-primary-900 active:text-white'
                  key={actionItem.ariaLabel}
                  aria-label={actionItem.ariaLabel}
                  variant='tertiary'
                  slotPrefix={actionItem.icon}
                  square
                >
                  {actionItem.role === 'login' && (
                    <p className='hidden lg:inline-flex whitespace-nowrap mr-2'>
                      {actionItem.label}
                    </p>
                  )}
                </SfButton>
              ))}
            </div>
          </nav>

          <div className='flex items-center'>
            <SfButton
              onClick={handleOpenMenu([])}
              variant='tertiary'
              square
              aria-label='Close menu'
              className='block md:hidden mr-5 bg-transparent hover:bg-primary-800 hover:text-white active:bg-primary-900 active:text-white'
            >
              <SfIconMenu />
            </SfButton>
            <a
              href='#'
              aria-label='SF Homepage'
              className='flex shrink-0 w-8 h-8 lg:w-[12.5rem] lg:h-[1.75rem] items-center text-white focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm'
            >
              <picture>
                <source
                  srcSet='https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_white.svg'
                  media='(min-width: 1024px)'
                />
                <img
                  src='https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_sign_white.svg'
                  alt='Sf Logo'
                />
              </picture>
            </a>
          </div>
        </div>
        {/* Desktop dropdown */}
        <nav ref={refs.setFloating}>
          <ul
            className='hidden md:flex px-6 py-2 justify-center bg-white border-b border-b-neutral-200 border-b-solid'
            onBlur={handleBlurWithin}
          >
            {content.children?.map((menuNode) => (
              <li key={menuNode.key}>
                <SfButton
                  variant='tertiary'
                  onMouseEnter={handleOpenMenu([menuNode.key])}
                  onClick={handleOpenMenu([menuNode.key])}
                  ref={refsByKey[menuNode.key]}
                  className='group mr-2 uppercase !text-neutral-900 hover:!bg-neutral-200 hover:!text-neutral-700 active:!bg-neutral-300 active:!text-neutral-900'
                >
                  <span>{menuNode.value.label}</span>
                </SfButton>
              </li>
            ))}
          </ul>
        </nav>
        {/* Mobile drawer */}
        {isOpen && (
          <>
            <div className='md:hidden fixed inset-0 bg-neutral-500 bg-opacity-50' />
            <SfDrawer
              ref={drawerRef}
              open={isOpen}
              onClose={close}
              placement='left'
              className='md:hidden right-[50px] max-w-[376px] bg-white overflow-y-auto'
            >
              <nav>
                <div className='flex items-center justify-between p-4 border-b border-b-neutral-200 border-b-solid'>
                  <p className='typography-text-base font-medium'>
                    Browse products
                  </p>
                  <SfButton
                    onClick={close}
                    variant='tertiary'
                    square
                    aria-label='Close menu'
                    className='ml-2'
                  >
                    <SfIconClose className='text-neutral-500' />
                  </SfButton>
                </div>
                <ul className='mt-2 mb-6'>
                  {activeMenu.key !== 'root' && (
                    <li>
                      <SfListItem
                        size='lg'
                        as='button'
                        type='button'
                        onClick={handleBack}
                        className='border-b border-b-neutral-200 border-b-solid'
                      >
                        <div className='flex items-center'>
                          <SfIconArrowBack className='text-neutral-500' />
                          <p className='ml-5 font-medium'>
                            {activeMenu.value.label}
                          </p>
                        </div>
                      </SfListItem>
                    </li>
                  )}
                  {activeMenu.children?.map((node) =>
                    node.isLeaf ? (
                      <li key={node.key}>
                        <SfListItem
                          size='lg'
                          as='a'
                          href={node.value.link}
                          className='first-of-type:mt-2'
                        >
                          <div className='flex items-center'>
                            <p className='text-left'>{node.value.label}</p>
                            <SfCounter className='ml-2'>
                              {node.value.counter}
                            </SfCounter>
                          </div>
                        </SfListItem>
                      </li>
                    ) : (
                      <li key={node.key}>
                        <SfListItem
                          size='lg'
                          as='button'
                          type='button'
                          onClick={handleNext(node.key)}
                        >
                          <div className='flex justify-between items-center'>
                            <div className='flex items-center'>
                              <p className='text-left'>{node.value.label}</p>{' '}
                              <SfCounter className='ml-2'>
                                {node.value.counter}
                              </SfCounter>
                            </div>
                            <SfIconChevronRight className='text-neutral-500' />
                          </div>
                        </SfListItem>
                      </li>
                    )
                  )}
                </ul>
                {bannerNode.value.banner && (
                  <div className='flex items-center overflow-hidden bg-neutral-100 border-neutral-300 grow'>
                    <img
                      src={bannerNode.value.banner}
                      alt={bannerNode.value.bannerTitle}
                      className='object-contain w-[50%] basis-6/12'
                    />
                    <p className='basis-6/12 p-6 font-medium typography-text-base'>
                      {bannerNode.value.bannerTitle}
                    </p>
                  </div>
                )}
              </nav>
            </SfDrawer>
          </>
        )}
      </header>
    </div>
  );
}
