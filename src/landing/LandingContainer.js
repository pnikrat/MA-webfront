// @flow
import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';
import FeatureSegment from './FeatureSegment';

function LandingContainer() {
  return (
    <div>
      <div className="jumbo">
        <div className="jumbo-content">
          <div className="jumbo-header">
            <h1>
              Grupowa lista zakupów
            </h1>
          </div>
          <div className="jumbo-buttons-container">
            <Button
              primary
              as={Link}
              to="/signup"
              data-cy="to-register-form-button"
              className="jumbo-button"
            >
              Rejestracja
            </Button>
            <Button
              primary
              as={Link}
              to="/signin"
              data-cy="to-login-form-button"
              className="jumbo-button"
            >
              Logowanie
            </Button>
          </div>
        </div>
      </div>
      <Container textAlign="justified">
        <FeatureSegment headerText="Dziel listy zakupów między rodziną i znajomymi">
          Połącz się w grupę ze swoją rodziną lub przyjaciółmi, aby dzielić z nimi
          listy zakupów. Po zaproszeniu do grupy osoba otrzyma dostęp do twoich list, a ty do jej.
          Dzięki temu możecie wspólnie wpisywać przedmioty na listę, odhaczać je, lub przenosić
          dowolnie między listami.
        </FeatureSegment>

        <FeatureSegment headerText="Pełna synchronizacja stanu listy zakupów">
          Nieważne, czy korzystasz z aplikacji mobilnej czy z aplikacji
          internetowej - stan Twojej listy zakupów będzie zawsze zsynchronizowany. Korzystaj z
          wygodnego wpisywania przedmiotów na listę w aplikacji internetowej, a
          następnie zabierz ze sobą telefon na zakupy, aby nie zapomnieć co chcesz kupić.
          Użytkownicy z twoich grup mogą nawet dopisać przedmioty do listy w trakcie
          Twoich zakupów - zmiany zobaczysz od razu.
        </FeatureSegment>

        <FeatureSegment headerText="Korzystaj z wyszukiwarki poprzednio dodanych przedmiotów">
          Wasza lista zakupów często wygląda tak samo? Wpisując nazwę przedmiotu,
          otrzymasz podpowiedzi, które bazują na przedmiotach, jakie kiedykolwiek znalazły się na
          Waszej liście. Skorzystaj z szybkiego wybierania, aby od razu dodać do
          listy przedmiot z przeszłości. Podpowiedzi obejmują również przedmioty z
          pozostałych list Waszej grupy.
        </FeatureSegment>

        <FeatureSegment headerText="Brak przedmiotu w sklepie? To nie problem">
          Oznacz przedmioty jako brakujące, a następnie przenieś je pojedynczo lub
          wszystkie na raz do innej listy zakupów. Będą one tam na Ciebie
          czekać, gotowe do odhaczenia!
        </FeatureSegment>

        <FeatureSegment headerText="Twoje wydatki - na bieżąco">
          Każdy przedmiot, któremu wpiszesz cenę, będzie uwzględniony w podsumowaniu
          Twojego koszyka oraz wszystkich przedmiotów na liście. Dzięki temu z góry wiesz,
          ile zapłacisz przy kasie.
        </FeatureSegment>

        <FeatureSegment headerText="Aplikacja w pełni open-source">
          Brakuje Ci jakiejś funkcjonalności? A może chcesz po prostu ulepszyć
          działanie istniejącej funkcji? Napisz ją sam, a może już wkrótce znajdzie się w
          opublikowanej nowej wersji aplikacji.
        </FeatureSegment>
      </Container>
    </div>
  );
}

export default LandingContainer;
