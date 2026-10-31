import React, { useMemo, useState } from 'react';
import { PBR_COMPONENT_CATALOGUE } from '../pbr/catalogue';

/** PBR component browser. CAD geometry creation is deliberately not faked here. */
export const PBRWorkbenchPanel: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [active, setActive] = useState('culture-vessel');
  const items = useMemo(() => PBR_COMPONENT_CATALOGUE.filter(x =>
    (x.label + ' ' + x.description).toLowerCase().includes(filter.toLowerCase())
  ), [filter]);
  const selected = PBR_COMPONENT_CATALOGUE.find(x => x.kind === active) ?? PBR_COMPONENT_CATALOGUE[0];
  const card: React.CSSProperties = { border: '1px solid var(--border)', borderRadius: 8, padding: 12, background: 'var(--surface-1)' };
  return <div style={{ height: '100%', overflow: 'auto', padding: 16, color: 'var(--text-primary)', background: 'var(--bg)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <div><div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--accent)' }}>PBR DIGITAL BIOSPHERE / PBR-07</div>
        <h2 style={{ margin: '5px 0', fontSize: 20 }}>Engineering workbench</h2>
        <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>3D CAD remains the primary design surface. This panel defines the first engineering component library.</div>
      </div>
      <span style={{ fontSize: 10, border: '1px solid var(--border)', borderRadius: 20, padding: '5px 9px' }}>CATALOGUE PREVIEW</span>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(190px, 0.8fr) minmax(260px, 1.5fr)', gap: 12, marginTop: 16 }}>
      <section style={card}>
        <h3 style={{ marginTop: 0, fontSize: 13 }}>Component library</h3>
        <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Filter components…" aria-label="Filter components" style={{ width: '100%', boxSizing: 'border-box', padding: 9, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-primary)' }} />
        <div style={{ display: 'grid', gap: 6, marginTop: 10 }}>
          {items.map(item => <button key={item.kind} onClick={() => setActive(item.kind)} style={{ textAlign: 'left', padding: 9, borderRadius: 6, border: '1px solid ' + (active === item.kind ? 'var(--accent)' : 'var(--border)'), background: active === item.kind ? 'var(--surface-2)' : 'transparent', color: 'var(--text-primary)', cursor: 'pointer' }}>
            <div style={{ fontSize: 12, fontWeight: 700 }}>{item.label}</div><div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{item.domain}</div>
          </button>)}
          {!items.length && <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>No matching components.</div>}
        </div>
      </section>
      <section style={card}>
        <div style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: 1 }}>COMPONENT DEFINITION</div>
        <h3 style={{ margin: '6px 0', fontSize: 17 }}>{selected.label}</h3>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>{selected.description}</p>
        <div style={{ fontSize: 11, margin: '14px 0 7px', fontWeight: 700 }}>Physical ports</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{selected.ports.map(p => <span key={p.id} style={{ border: '1px solid var(--border)', padding: '5px 7px', borderRadius: 5, fontSize: 10 }}>{p.id} · {p.medium} · {p.direction}</span>)}</div>
        <div style={{ fontSize: 11, margin: '16px 0 7px', fontWeight: 700 }}>Parameters (SI)</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(135px,1fr))', gap: 7 }}>{selected.parameters.map(p => <div key={p.id} style={{ border: '1px solid var(--border)', borderRadius: 6, padding: 8 }}><div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{p.label}</div><div style={{ fontSize: 13, fontWeight: 700 }}>{p.symbol} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{p.unit}</span></div><div style={{ fontSize: 9, color: 'var(--text-muted)' }}>Value not yet assigned</div></div>)}</div>
        <div style={{ marginTop: 16, padding: 10, borderRadius: 6, background: 'var(--surface-2)', fontSize: 11, lineHeight: 1.5 }}>Native CAD feature generation is the next integration step. No placeholder geometry is created or presented as editable geometry.</div>
      </section>
    </div>
  </div>;
};
