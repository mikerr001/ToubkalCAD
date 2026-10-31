# PBR-07 physics and validation contract

## Coordinate and unit conventions
- Right-handed Cartesian coordinates; SI base units.
- Geometry: metres (m); time: seconds (s); pressure: pascals (Pa); temperature: kelvin (K).
- Mass flow: kg/s; volume flow: m³/s; irradiance: W/m².
- PAR photon flux is distinct from irradiance.
- Dissolved molecular CO₂ and total dissolved inorganic carbon (DIC) are distinct state variables.

## Physical domains
1. External water / ambient environment.
2. Internal culture liquid.
3. Gas headspace.
4. Crop/root-zone liquid or substrate.
5. Internal air.
6. Solid structure and optical surfaces.

A connection between domains requires an explicit transfer interface; geometry contact alone does not imply mass or heat transfer.

## Tier-1 hydraulic model
For a circular pipe: A = πD²/4; v = Q/A; Re = ρvD/μ; Δp = f(L/D)(ρv²/2); Δp_minor = K(ρv²/2).

Friction factor: laminar f = 64/Re below Re 2300; Swamee-Jain approximation in turbulent flow; linear interpolation through the transition range. Inputs are SI. The first implementation handles a single pipe path per call. Multi-branch networks, pump operating points and transients are not implemented.

## Initial coupling order
1. Geometry and domain/port topology.
2. Hydraulic network.
3. Lumped thermal balance.
4. Optical attenuation and path-average PAR.
5. Existing PBR-02 biology.
6. Gas-liquid transfer and carbon chemistry only where state definitions are compatible.

Do not claim fully coupled multiphysics until convergence and conservation are demonstrated.

## Validation gates
Each result must carry model ID/version, fidelity tier, validation status, units, input provenance, assumptions, applicability range, numerical method, residual/convergence status, warnings and invalid-state reasons.

Minimum hydraulic tests: laminar f against 64/Re; turbulent f against an independent calculation; pressure drop linear with pipe length; turbulent pressure drop approximately quadratic with flow; zero flow gives zero loss; invalid geometry/fluid properties rejected.

A finite or visually plausible result is not validated. Compare against an independent benchmark or experiment; report bias/MAE/RMSE as appropriate and hold out validation data by experiment/publication.

## Explicit exclusions
No CFD fields, bubble hydrodynamics, waves, free-surface effects, multiphase transport, detailed radiation, structural stress, pressure-vessel safety, human physiology or habitat occupancy. This is research/engineering software, not a certified life-support system.
