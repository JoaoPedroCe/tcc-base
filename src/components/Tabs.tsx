import { Tab } from '@headlessui/react'

import Div from '~/components/Div'


const Tags = () => {
  return (
    <Div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-8">
      <Tab.Group>
        <Tab.List className="scrollbar-hidden flex w-full flex-row space-x-2 overflow-auto rounded-lg md:w-2/5 md:flex-col md:space-x-0 md:space-y-2 lg:w-1/5 xl:w-1/6">
          <Tab className="flex transform items-center rounded-lg p-3 py-2.5 font-medium leading-5 transition duration-200  md:w-full focus:outline-none bg-component shadow">
            Layout
          </Tab>
        </Tab.List>
        <Div className="w-full max-w-2xl">
          <Tab.Panels>
            <Tab.Panel className="flex w-full flex-col space-y-6 rounded-md bg-component px-6 py-5 text-gray-900 shadow sm:p-8">
              Content 1
            </Tab.Panel>
          </Tab.Panels>
        </Div>
      </Tab.Group>
    </Div>
  )
}

export default Tags
