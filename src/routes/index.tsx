import type { JSX } from "solid-js";
import { For, Show, createEffect, createSignal, onMount, splitProps } from "solid-js";

type Memo = [key: number, value: string];

type TextAreaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  borderwidth: number;
};

function Logo() {
  return <img id="logo" src="/logo.png" alt="Logo" width={500} height={84} />;
}

function TextArea(props: TextAreaProps) {
  let ref: HTMLTextAreaElement | undefined;
  const [local, textareaProps] = splitProps(props, ["borderwidth", "value"]);

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
  return <textarea rows={1} ref={(el) => (ref = el)} {...textareaProps} value={local.value} />;
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
          <form id="write" onSubmit={handleSubmit}>
            <TextArea
              borderwidth={2}
              placeholder="New Memo"
              value={input()}
              onInput={(e) => setInput(e.currentTarget.value)}
            />
            <button type="submit" disabled={input() === ""} aria-label="Create memo">
              &#9998;
            </button>
          </form>
          <div id="result">
            <For each={loadedMemos()}>
              {([key, content]) => (
                <div class="result-memo">
                  <TextArea borderwidth={8} value={content} onInput={handleChange(key)} />
                  <button type="button" onClick={handleDelete(key)} aria-label="Delete memo">
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
