# 🔧 Turbopack Debugging Setup for Cursor IDE

## Overview
This guide explains how to debug Next.js with Turbopack in Cursor IDE, including "run to cursor" functionality. **Turbopack is optimized for faster client-side debugging** with improved source maps and faster rebuild times.

## Prerequisites
- Cursor IDE (or VS Code)
- Node.js installed
- Next.js 16+ with Turbopack

## Configuration Files

### 1. `.vscode/launch.json`
Contains debug configurations for:
- **Next.js: debug Turbopack (Node.js)** - Debug server-side code
- **Next.js: debug Turbopack (Chrome)** - Debug client-side code
- **Next.js: debug full stack (Turbopack)** - Debug both simultaneously

### 2. `.vscode/settings.json`
Contains IDE settings for:
- Auto-attach debugging
- Source map support
- TypeScript configuration

### 3. `.vscode/tasks.json`
Contains build tasks for development workflow

## How to Use

### Method 1: Using Debug Panel (Recommended)

1. **Open Debug Panel**
   - Press `Cmd+Shift+D` (Mac) or `Ctrl+Shift+D` (Windows/Linux)
   - Or click the Debug icon in the sidebar

2. **Select Configuration**
   - **For client-side only (fastest)**: Choose "Next.js: debug client-side only (Turbopack - Fast)"
   - **For full-stack**: Choose "Next.js: debug full stack (Turbopack)"
   - Turbopack provides faster builds and better source maps for client-side debugging

3. **Set Breakpoints**
   - Click in the gutter (left of line numbers) to set breakpoints
   - Red dots indicate active breakpoints

4. **Start Debugging**
   - Press `F5` or click the green play button
   - Server will start with debugging enabled
   - Chrome will open automatically

5. **Use "Run to Cursor"**
   - Place cursor on the line where you want to pause
   - Press `Cmd+F10` (Mac) or `Ctrl+F10` (Windows/Linux)
   - Or right-click → "Run to Cursor"
   - Execution will pause at that line

### Method 2: Using Terminal with Auto-Attach

1. **Enable Auto-Attach**
   - Open Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
   - Type "Debug: Toggle Auto Attach"
   - Select "Smart" or "Always"

2. **Start Dev Server**
   ```bash
   npm run dev:next
   ```

3. **Set Breakpoints and Debug**
   - Set breakpoints in your code
   - Navigate to http://localhost:3000
   - Debugger will automatically attach

### Method 3: Manual Attach

1. **Start Server with Inspect**
   ```bash
   NODE_OPTIONS='--inspect' npm run dev:next
   ```

2. **Attach Debugger**
   - Select "Attach to Next.js" from debug configurations
   - Press `F5`
   - Debugger will attach to running process

## Debugging Features

### Breakpoints
- **Regular Breakpoints**: Click in gutter
- **Conditional Breakpoints**: Right-click → "Add Conditional Breakpoint"
- **Logpoints**: Right-click → "Add Logpoint" (logs without stopping)

### Step Controls
- **Continue** (`F5`): Resume execution
- **Step Over** (`F10`): Execute current line, don't enter functions
- **Step Into** (`F11`): Enter function calls
- **Step Out** (`Shift+F11`): Exit current function
- **Restart** (`Cmd+Shift+F5` / `Ctrl+Shift+F5`): Restart debugging session
- **Stop** (`Shift+F5`): Stop debugging

### Run to Cursor
- **Shortcut**: `Cmd+F10` (Mac) or `Ctrl+F10` (Windows/Linux)
- **Usage**: Place cursor on target line, press shortcut
- **Behavior**: Execution pauses at cursor position

## Troubleshooting

### Breakpoints Not Hitting

1. **Check Source Maps**
   - Ensure `sourceMaps: true` in `tsconfig.json`
   - Verify source map files exist in `.next` directory

2. **Verify File Paths**
   - Check `sourceMapPathOverrides` in `launch.json`
   - Ensure paths match your project structure

3. **Clear Cache**
   ```bash
   rm -rf .next
   npm run dev:next
   ```

### Debugger Not Attaching

1. **Check Port**
   - Default port is 9229
   - Verify no other process is using it
   ```bash
   lsof -i :9229
   ```

2. **Check NODE_OPTIONS**
   - Ensure `--inspect` or `--inspect-brk` is set
   - Check environment variables

3. **Restart Debug Session**
   - Stop current session
   - Restart with `F5`

### Turbopack-Specific Issues

1. **Source Maps**
   - Turbopack generates source maps automatically
   - If issues persist, check `next.config.ts` for source map settings

2. **Hot Reload**
   - Breakpoints may reset on hot reload
   - Re-set breakpoints if needed

3. **Performance**
   - Turbopack is faster but debugging may be slightly different
   - Use regular Next.js dev mode if needed: `npm run dev` (without --turbo)

## Advanced Configuration

### Custom Source Map Paths
Edit `.vscode/launch.json`:
```json
"sourceMapPathOverrides": {
  "turbopack://*": "${webRoot}/*",
  "webpack://_N_E/*": "${webRoot}/*"
}
```

### Skip Files
To skip node_modules in debugging:
```json
"skipFiles": [
  "<node_internals>/**",
  "**/node_modules/**"
]
```

### Environment Variables
Add to `launch.json`:
```json
"env": {
  "NODE_ENV": "development",
  "SKIP_ENV_VALIDATION": "true"
}
```

## Tips

1. **Use Compound Configurations**
   - Debug both server and client simultaneously
   - Select "Next.js: debug full stack (Turbopack)"

2. **Watch Variables**
   - Add variables to Watch panel
   - Monitor values as you step through code

3. **Call Stack**
   - Use Call Stack panel to see execution path
   - Click to jump to different stack frames

4. **Debug Console**
   - Evaluate expressions in Debug Console
   - Type variable names to see values

5. **Breakpoint Conditions**
   - Set conditions on breakpoints
   - Only break when condition is true
   - Example: `user.id === 123`

## Resources

- [Next.js Debugging Guide](https://nextjs.org/docs/advanced-features/debugging)
- [VS Code Debugging](https://code.visualstudio.com/docs/editor/debugging)
- [Turbopack Documentation](https://turbo.build/pack/docs)
