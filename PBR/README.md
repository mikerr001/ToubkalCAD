# PBR Digital Biosphere engineering workspace

This directory is the PBR-07 integration layer inside the user's ToubkalCAD fork.

## Platform decision

This fork retains ToubkalCAD as the primary 3D parametric engineering environment:
- OpenCascade.js/WASM remains the solid-modeling kernel.
- Three.js remains the engineering viewport.
- React and the existing CAD scene/store remain the application shell.
- PBR-specific component metadata, physical domains, simulation contracts and reduced-order solvers are added as an extension.

Upstream: [ToubkalCAD/ToubkalCAD](https://github.com/ToubkalCAD/ToubkalCAD)  
Fork: [mikerr001/ToubkalCAD](https://github.com/mikerr001/ToubkalCAD)

The upstream MIT license and third-party notices must be preserved. This integration does not relicense upstream code.

## What exists in this first integration slice

- `src/pbr/types.ts`: SI-first project, component and simulation contracts.
- `src/pbr/catalogue.ts`: initial biological reactor engineering component catalogue.
- `src/pbr/solvers/pipeNetwork.ts`: transparent Tier-1 single-path Darcy-Weisbach pressure-loss calculator.
- `src/pbr/solvers/pipeNetwork.test.ts`: deterministic numerical and invalid-input tests.
- `PBR/schemas/project.schema.json`: project manifest validation schema.
- `PBR/PHYSICS_AND_VALIDATION.md`: model assumptions, limitations and validation gates.

## Fidelity policy

The initial hydraulic calculator is a reduced-order network estimate, not CFD. It assumes steady, incompressible, single-phase Newtonian flow in a circular pipe. It does not resolve elbows, tees, pump curves, gas bubbles, multiphase flow, biofouling, transient water hammer, or spatial flow fields. Fittings are represented only if a user supplies their aggregate loss coefficient.

The result is marked `ESTIMATE`, never `VALIDATED`. Missing or invalid physical inputs return an explicit error; the solver must not silently invent values.

## Next integration steps

1. Bind PBR component metadata to ToubkalCAD feature/assembly nodes.
2. Add native parametric templates for vessel, headspace, ports, sparger, pipes, pump and light modules.
3. Add a simulation panel and scene overlays for pressure, velocity, temperature and optical fields.
4. Connect existing PBR-02 through PBR-06 biology and control modules through versioned adapters.
5. Add independently validated thermal, gas-transfer, optical and biological solvers.
6. Introduce external high-fidelity solvers only behind the same explicit solver contracts.

Do not use this software to design or certify pressure vessels, occupied habitats, or human life-support systems.
