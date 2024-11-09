
# AI Video Editor

This project is an AI-powered video editor built with React and Remotion. It allows users to upload, preview, and apply AI-driven edits to media files. The editor provides essential video playback controls, a dark mode toggle, and the option to edit videos using Natural Language Processing (NLP) prompts.

## Features

- **Upload and Preview**: Upload images or videos to preview them in a customizable player.
- **Video Playback Controls**: Play, pause, skip forward, and rewind within the video.
- **NLP Editing**: Edit videos with AI based on user-defined text prompts.
- **Dark Mode**: Toggle between light and dark themes.
- **Timeline Slider**: Adjust the playback position using a timeline slider.
- **Download Edited Video**: Download the AI-edited video once processing is complete.

## Components Used

This project uses the following components:
- **Player** (from `@remotion/player`): Handles video preview and playback.
- **UI Components**: Including `Button`, `Input`, `Slider`, `Switch`, and `Progress`, which enhance the user interface.
- **Icons**: From `lucide-react` for buttons and indicators.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/ai-video-editor.git
   cd ai-video-editor
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

   The application should now be available on `http://localhost:3000`.

## Usage

1. **Upload Media**: Click the "Import Media" button to select video or image files to preview in the editor.
2. **Edit with NLP**: Type an editing prompt (e.g., "add a sepia filter") into the NLP input field and press "Edit with AI" to process the edit.
3. **Play/Pause and Navigation**: Use the playback controls to play, pause, skip forward, or rewind the video.
4. **Download Edited Video**: Once the AI has processed the edit, download the edited file by clicking the download button.

## Customization

- **Dark Mode**: Adjusts automatically based on user system preferences or can be toggled manually.
- **Playback Controls**: Use the timeline slider to change playback position.

## Technologies Used

- **React**: For building UI components.
- **Remotion**: For rendering video previews and playback control.
- **lucide-react**: For icons.
- **TypeScript**: For type safety and code readability.

## Known Issues & Improvements

- **Error Handling**: Currently, errors during editing are logged to the console. Error handling could be improved for better user experience.
- **Progress Indicator**: The progress bar currently displays simulated progress; integrating real progress tracking would enhance usability.
- **Additional Edit Options**: Add more NLP edit capabilities to support a wider range of video edits.

## License

This project is licensed under the MIT License.
```

