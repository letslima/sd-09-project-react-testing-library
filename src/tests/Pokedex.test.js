import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Tests for the Pokedex component', () => {
  it('should have a h2 with the text "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading2 = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(heading2).toBeInTheDocument();
  });

  it('should show the next pokemon when "Proximo pokémon" is clicked,'
  + ' and go back to the first after the last one is clicked', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    const nextPokemonButton = getByTestId('next-pokemon');
    expect(nextPokemonButton).toBeInTheDocument();
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(nextPokemonButton);
    });
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });

  it('should show only one pokemon at once', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });

  it('should render all pokemon type buttons', () => {
    const pokemonTypesList = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    const { getAllByTestId } = renderWithRouter(<App />);
    const typeButtons = getAllByTestId('pokemon-type-button');
    expect(typeButtons.length).toBe(pokemonTypesList.length);
  });
});
