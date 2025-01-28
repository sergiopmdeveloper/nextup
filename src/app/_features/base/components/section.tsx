/**
 * Section component.
 * @param {SectionProps} props - The props of the component.
 * @param {React.ReactNode} props.children - The children to render.
 */
export default function Section({ children }: SectionProps) {
  return (
    <section className="mx-auto my-6 w-full max-w-screen-2xl px-6">
      {children}
    </section>
  );
}

/**
 * Section component props.
 */
type SectionProps = Readonly<{
  children: React.ReactNode;
}>;
