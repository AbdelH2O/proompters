import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const ClosableInput = ({
	title,
	handleColor,
	placeHolder,
}: {
	title: string;
	handleColor: string;
	placeHolder: string;
}) => {
	return (
		<div className="w-full px-4">
			<div className="mx-auto w-full rounded-md bg-primary-800 p-1">
				<Disclosure
					defaultOpen={true}
				>
					{({ open }) => (
						<>
							<Disclosure.Button className="flex w-full justify-start gap-3 rounded-lg py-2 pl-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
								<ChevronUpIcon
									className={`${
										open ? "rotate-180 transform" : ""
									} h-5 w-5`}
									style={{
										color: handleColor,
									}}
								/>
								<span>{title}</span>
							</Disclosure.Button>
							<Disclosure.Panel className=" text-sm text-gray-500">
								<textarea
									onInput={(e) => {
										e.currentTarget.style.height = "auto";
										e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
									}}
									style={{ resize: "none", height: "auto" }}
									className="h-10 w-full rounded-md border-0 bg-primary-800 p-2 text-sm focus:outline-none focus:ring-0 text-stone-100"
									placeholder={placeHolder}
								/>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
		</div>
	);
};

export default ClosableInput;
