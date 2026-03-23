import { useState, useMemo, useEffect } from "react";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { ControllerRenderProps } from "react-hook-form";

interface Option {
  value: string; 
  label: string; 
}

interface Props {
  field: ControllerRenderProps<{ walletId: string; amount: number }, "walletId">;
  users: { walletId: string; phone: string }[];
}

export default function SearchPhone({ field, users }: Props) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const options: Option[] = useMemo(
    () => users.map((u) => ({ value: u.walletId, label: u.phone })),
    [users]
  );

  useEffect(() => {
    const selected = options.find((o) => o.value === field.value);
    setInputValue(selected ? selected.label : "");
  }, [field.value, options]);

  const filteredOptions = useMemo(() => {
    if (!inputValue) return options;
    const search = inputValue.replace(/\s/g, "");
    return options.filter((option) => option.label?.includes(search));
  }, [inputValue, options]);

  const handleSelect = (selected: Option) => {
    setInputValue(selected.label); 
    field.onChange(selected.value);
    setOpen(false);
  };

  return (
    <div className="*:not-first:mt-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
          >
            <span className={!inputValue ? "text-muted-foreground truncate" : "truncate"}>
              {inputValue || "Search phone number"}
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput
              placeholder="Type phone number..."
              value={inputValue}
              onValueChange={(val) => setInputValue(val)}
            />
            <CommandList>
              {filteredOptions.length === 0 && <CommandEmpty>No user found.</CommandEmpty>}
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option)}
                  >
                    {option.label}
                    {field.value === option.value && <CheckIcon size={16} className="ml-auto" />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
