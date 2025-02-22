import { Component, Input } from '@angular/core';
import { IUsuario } from '../../interfaces/i-usuario';
import { BotoneraComponent } from "../botonera/botonera.component";

@Component({
  selector: 'app-usuario-card',
  standalone: true,
  imports: [BotoneraComponent],
  templateUrl: './usuario-card.component.html',
  styleUrl: './usuario-card.component.css'
})
export class UsuarioCardComponent {

  imagenSrc: string;
  imagenAlt: string;

  textoAleatorio: string;
  textos: string[];

  @Input() miUser!: IUsuario;

  constructor(){
    this.imagenAlt = "";
    this.imagenSrc = "";
    this.textoAleatorio = "";
    this.textos = [
      "You were the Chosen One! It was said that you would destroy the Sith, not join them! Bring balance to the Force, not leave it in darkness!",
      "I have seen a security hologram of him killing younglings. Not Anakin! He’s a Jedi! He’s a Knight of the Republic!",
      "Fear is the path to the dark side. Fear leads to anger, anger leads to hate, hate leads to suffering.",
      "The dark side is a pathway to many abilities some consider to be unnatural.",
      "To be a Jedi is to face the truth and choose. Give off the dark side, and your destiny will be changed forever."
    ];
  } 
  ngOnInit(){
    this.cargarImagenAleatoria();
    this.cargarTextoAleatorio();
  } 
  cargarImagenAleatoria(): void {
    const numeroAleatorio = Math.floor(Math.random() * 5) + 1; 
    this.imagenSrc = `/assets/images/${numeroAleatorio}.webp`; 
    this.imagenAlt = `Imagen ${numeroAleatorio}`;
  }

  cargarTextoAleatorio(): void {
    const indiceAleatorio = Math.floor(Math.random() * this.textos.length); 
    this.textoAleatorio = this.textos[indiceAleatorio];
  }
}
