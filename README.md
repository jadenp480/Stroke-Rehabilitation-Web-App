# Stroke Rehabilitation Web Application

A web-based neuro-rehabilitation platform designed to help post-stroke patients retrain fine motor control and hand–eye coordination through interactive, game-based exercises.

This project was developed as part of a university engineering course and focuses on accessibility, adaptability, and real-time feedback to support a wide range of user abilities.

---

## Project Overview

Stroke recovery often requires repetitive, targeted exercises to rebuild motor control. This application provides a set of browser-based rehabilitation games that simulate these exercises in a more engaging, accessible format.

The platform is entirely client-side and runs in the browser with no installation required, making it easy to deploy and use across different devices.

---

## Core Features

### Object Selection Game (Click the Planets)
- Timed target-selection game that trains hand–eye coordination
- Difficulty levels adjust target size and precision requirements
- Tracks performance metrics such as:
  - Total clicks
  - Completion time
  - Missed targets
- Designed to work with mouse, trackpad, or touchscreen input

### Shape Tracing Game
- Users trace randomly generated geometric shapes
- Measures tracing accuracy using distance-based point matching
- Provides real-time visual feedback and a final accuracy score
- Encourages precision and controlled movement

### Typing Coordination Game
- Timed typing challenge focused on coordination and speed
- Tracks characters typed, elapsed time, and completion accuracy
- Includes visual feedback and session-based scoring

---

## Technical Details

- Languages: JavaScript, HTML, CSS
- Graphics Library: p5.js
- Architecture:
  - Modular game structure with each game implemented in its own JavaScript file
  - Central game state controller for navigation and transitions
  - Real-time performance tracking and scoring logic
- Input Support: Mouse, trackpad, touchscreen, and keyboard

---
