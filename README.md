# SecureTokenWallet

SecureTokenWallet to projekt stworzony z myślą o bezpiecznym przechowywaniu tokenów oraz dokonywaniu wpłat i wypłat w kontrakcie Ethereum. Jest to aplikacja wykorzystująca Solidity, Ethereum oraz ERC20 do zarządzania transakcjami i tokenami.

## Funkcje

- **MyWallet Contract**:
  - Możliwość wpłacania ETH do portfela.
  - Możliwość wypłacania ETH przez właściciela portfela.
  - Zdarzenia `Deposited` i `Withdrawn` dla śledzenia transakcji.
  - Ochrona dostępu dla właściciela za pomocą modyfikatora `onlyOwner`.

- **MyToken Contract**:
  - Stworzenie własnego tokena ERC20 z możliwością transferu, zatwierdzania i transferu z upoważnieniem.
  - Zdarzenia `Transfer` i `Approval` dla śledzenia działań z tokenami.
  
## Wymagania

- [Node.js](https://nodejs.org/) - wersja 16 lub nowsza.
- [Hardhat](https://hardhat.org/) - środowisko do pracy z Ethereum.
- [Metamask](https://metamask.io/) - portfel do interakcji z dApp.
- [Ganache](https://www.trufflesuite.com/ganache) lub [Infura](https://infura.io/) - do połączenia z siecią Ethereum.

## Instalaacja
1. **Sklonuj repozytorium**:
   ```bash
   git clone https://github.com/tura11/SecureTokenWallet.git
   cd SecureTokenWallet
   npm install
   npx hardhat ignition deploy ./ignition/modules/Lock.js
   
Użycie
Interakcja z kontraktem MyWallet:

Możesz wpłacać ETH do kontraktu przez Metamask.
Właściciel kontraktu może wypłacić ETH z portfela.
Interakcja z kontraktem MyToken:

Możesz przesyłać tokeny, zatwierdzać inne konta do transferu tokenów oraz sprawdzać saldo.
Wnioski
Projekt SecureTokenWallet to przykład wykorzystania technologii Ethereum do zarządzania tokenami i ETH w bezpieczny sposób. Może posłużyć jako podstawa do budowy bardziej zaawansowanych aplikacji DeFi.

Wkład
Jeśli chcesz przyczynić się do rozwoju tego projektu, utwórz pull request lub zgłoś problem (issue). Twoja pomoc będzie mile widziana!
