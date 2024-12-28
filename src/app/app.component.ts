import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ControlsComponent } from './features/visualizer/components/controls/controls.component';
import { VisualizerPageComponent } from './features/visualizer/containers/visualizer-page/visualizer-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ControlsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sorting-visualizer';
}
