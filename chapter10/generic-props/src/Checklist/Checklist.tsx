type Props<Data> = {
  data: Data[];
  id: keyof Data;
  primary: keyof Data;
  secondary: keyof Data;
};

export function Checklist<Data>({ data, id, primary, secondary }: Props<Data>) {
  return (
    <ul>
      {data.map((item) => {
        const idValue = item[id] as unknown;
        if (typeof idValue !== "string" && typeof idValue !== "number") {
          return null;
        }
        const primaryText = item[primary] as unknown;
        if (typeof primaryText !== "string") {
          return null;
        }
        const secondaryText = item[secondary] as unknown;
        return (
          <li key={idValue}>
            <div className="primary">{primaryText}</div>
            {typeof secondaryText === "string" && (
              <div className="secondary">{secondaryText}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}