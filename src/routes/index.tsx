import type { JSX } from "solid-js";
import { For, Show, createEffect, createSignal, onMount, splitProps } from "solid-js";

type Memo = [key: number, value: string];

type TextAreaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  borderwidth: number;
};

function Logo() {
  return <img class="mx-auto block" src="/logo.png" alt="Logo" width={500} height={84} />;
}

function TextArea(props: TextAreaProps) {
  let ref: HTMLTextAreaElement | undefined;
  const [local, textareaProps] = splitProps(props, ["borderwidth", "class", "value"]);

  const resize = () => {
    if (!ref) {
      return;
    }

    ref.style.height = "inherit";
    ref.style.height = `${ref.scrollHeight + local.borderwidth * 2}px`;
  };

  createEffect(() => {
    void local.value;
    queueMicrotask(resize);
  });

  onMount(resize);

  // TODO: 스크롤 막 변함
  return (
    <textarea
      rows={1}
      ref={(el) => (ref = el)}
      class={[
        "block h-10 w-full resize-none overflow-hidden border-0 bg-white/95 text-[1.2em] outline-none",
        local.class,
      ]
        .filter(Boolean)
        .join(" ")}
      {...textareaProps}
      value={local.value}
    />
  );
}

export default function Home() {
  const [input, setInput] = createSignal("");
  const [memos, setMemos] = createSignal<Memo[] | null>(null);

  onMount(async () => {
    const res = await fetch("/memos");
    const data = (await res.json()) as Memo[];
    setMemos(data);
  });

  const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (e) => {
    e.preventDefault();

    const content = input();
    setInput("");

    // TODO: Error handling
    const resp = await fetch("/memos", {
      method: "POST",
      body: content,
    });
    if (!resp.ok) {
      setInput(content);
      return;
    }

    const key = Number.parseInt(await resp.text(), 10);
    setMemos((prev) => (prev ? [...prev, [key, content]] : prev));
  };

  const handleChange =
    (key: number): JSX.EventHandler<HTMLTextAreaElement, InputEvent> =>
    async (e) => {
      const content = e.currentTarget.value;
      setMemos((prev) =>
        prev
          ? prev.map(([k, old]) =>
              k === key ? ([k, content] satisfies Memo) : ([k, old] satisfies Memo),
            )
          : prev,
      );

      // TODO: Error handling
      // TODO: Too frequent
      await fetch(`/memos/${key}`, {
        method: "PUT",
        body: content,
      });
    };

  const handleDelete =
    (key: number): JSX.EventHandler<HTMLButtonElement, MouseEvent> =>
    async () => {
      setMemos((prev) => (prev ? prev.filter(([k]) => k !== key) : prev));

      // TODO: Error handling
      await fetch(`/memos/${key}`, { method: "DELETE" });
    };

  return (
    <Show when={memos()} fallback={<Logo />}>
      {(loadedMemos) => (
        <>
          <Logo />
          <form class="relative mx-auto mt-10 mb-20 max-w-[600px] px-5" onSubmit={handleSubmit}>
            <TextArea
              borderwidth={2}
              class="min-h-[60px] rounded-[7px] border-2 border-black/10 p-3 shadow-[5px_5px_0_rgba(0,0,0,0.1)] transition-[height,min-height] duration-200 placeholder:text-center placeholder:text-[1.8em] placeholder:leading-9 placeholder:transition-colors focus:placeholder:text-transparent"
              placeholder="New Memo"
              value={input()}
              onInput={(e) => setInput(e.currentTarget.value)}
            />
            <button
              type="submit"
              class="absolute right-[50px] bottom-[21px] cursor-pointer border-0 bg-transparent text-[1.3em] text-[#1abc9c] transition-colors duration-300 disabled:cursor-default disabled:text-[#ccc]"
              disabled={input() === ""}
              aria-label="Create memo"
            >
              &#9998;
            </button>
          </form>
          <div class="mx-auto columns-[3_20px] px-[15px] md:w-[750px] lg:w-[970px] xl:w-[1170px]">
            <For each={loadedMemos()}>
              {([key, content]) => (
                <div class="relative inline-block w-full">
                  <TextArea
                    borderwidth={8}
                    class="my-[5px] border-[8px] border-transparent p-1 shadow-[0_3px_0_rgba(0,0,0,0.08)] transition-[height,min-height,border-color] duration-200 focus:border-black/5"
                    value={content}
                    onInput={handleChange(key)}
                  />
                  <button
                    type="button"
                    class="absolute top-[2px] right-[3px] cursor-pointer border-0 bg-transparent text-black/20 transition-colors hover:text-black/50 focus:text-black/50"
                    onClick={handleDelete(key)}
                    aria-label="Delete memo"
                  >
                    &times;
                  </button>
                </div>
              )}
            </For>
          </div>
        </>
      )}
    </Show>
  );
}
