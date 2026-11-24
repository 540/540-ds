import styles from './charts.module.css';

/** The data of a chart as a table only screen readers see: the drawing is decorative, this is what they read. */
export function DataTable({ caption, columns, rows }: { caption: string; columns: string[]; rows: (string | number)[][] }) {
  return (
    <table className={styles.srOnly}>
      <caption>{caption}</caption>
      <thead>
        <tr>
          {columns.map((c, i) =>
            c === '' ? (
              <td key={i} />
            ) : (
              <th key={i} scope="col">
                {c}
              </th>
            ),
          )}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, r) => (
          <tr key={r}>
            {row.map((cell, c) =>
              c === 0 ? (
                <th key={c} scope="row">
                  {cell}
                </th>
              ) : (
                <td key={c}>{cell}</td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
