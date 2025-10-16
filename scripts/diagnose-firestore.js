// 🔍 Kawaii Quest - Firestore Diagnostic Script
// Wklej ten kod w konsoli przeglądarki (F12) aby zdiagnozować problemy z sync

console.log('🔍 KAWAII QUEST - DIAGNOSTYKA FIRESTORE');
console.log('=====================================\n');

// 1. Sprawdź status logowania
console.log('1️⃣ STATUS LOGOWANIA:');
console.log('   Zalogowany:', window.firebaseCurrentUser ? '✅ TAK' : '❌ NIE');
if (window.firebaseCurrentUser) {
    console.log('   User ID:', window.firebaseCurrentUser.uid);
    console.log('   Email:', window.firebaseCurrentUser.email);
}
console.log('');

// 2. Sprawdź realtime sync
console.log('2️⃣ REALTIME SYNC:');
console.log('   Aktywny:', window.firebaseRealtimeSyncActive ? '✅ TAK' : '❌ NIE');
console.log('');

// 3. Sprawdź ostatnie błędy
console.log('3️⃣ OSTATNIE BŁĘDY:');
console.log('   Błąd:', window.firebaseLastError || '✅ Brak błędów');
console.log('   Ostatni odczyt:', window.firebaseLastReadAttempt || '—');
console.log('   Ostatni zapis:', window.firebaseLastWriteAttempt || '—');
console.log('');

// 4. Test połączenia z Firestore
console.log('4️⃣ TEST POŁĄCZENIA:');
console.log('   Rozpoczynam test zapisu i odczytu...\n');

async function testFirestore() {
    if (!window.firebaseCurrentUser) {
        console.error('   ❌ Nie można testować - musisz być zalogowany/a!');
        console.log('\n💡 ROZWIĄZANIE: Kliknij przycisk "Zaloguj przez Google" w prawym górnym rogu.');
        return;
    }

    try {
        console.log('   📝 Test 1/3: Próba zapisu danych...');
        await window.forcePush();
        
        if (window.firebaseLastError && window.firebaseLastError.includes('permission-denied')) {
            console.error('   ❌ BŁĄD ZAPISU: Brak uprawnień (permission-denied)');
            console.log('\n🔒 DIAGNOZA: PROBLEM Z REGUŁAMI FIRESTORE!');
            console.log('\n💡 ROZWIĄZANIE:');
            console.log('   1. Otwórz: https://console.firebase.google.com/project/kawaii-quest/firestore/rules');
            console.log('   2. Upewnij się że reguły zawierają:');
            console.log('      allow read, write: if request.auth != null && request.auth.uid == userId;');
            console.log('   3. Kliknij "Publish"');
            console.log('   4. Zaczekaj 1-2 minuty i odśwież stronę\n');
            return;
        }
        console.log('   ✅ Zapis zakończony sukcesem!');
        
        await new Promise(r => setTimeout(r, 2000));
        
        console.log('   📖 Test 2/3: Próba odczytu danych...');
        await window.forcePull();
        
        if (window.firebaseLastError && window.firebaseLastError.includes('permission-denied')) {
            console.error('   ❌ BŁĄD ODCZYTU: Brak uprawnień (permission-denied)');
            console.log('\n🔒 DIAGNOZA: PROBLEM Z REGUŁAMI FIRESTORE!');
            console.log('\n💡 ROZWIĄZANIE: Zobacz instrukcję powyżej.\n');
            return;
        }
        console.log('   ✅ Odczyt zakończony sukcesem!');
        
        console.log('   🔄 Test 3/3: Pełna synchronizacja...');
        await window.syncNow();
        console.log('   ✅ Synchronizacja zakończona sukcesem!');
        
        console.log('\n🎉 WSZYSTKIE TESTY PRZESZŁY POMYŚLNIE!');
        console.log('\n✅ DIAGNOZA: Firestore działa poprawnie!');
        console.log('\n💡 Jeśli nadal nie ma synchronizacji między urządzeniami:');
        console.log('   1. Upewnij się że jesteś zalogowany/a NA OBIE urządzenia (komputer + telefon)');
        console.log('   2. Upewnij się że używasz TEGO SAMEGO konta Google');
        console.log('   3. Porównaj "ID użytkownika" w panelu Synchronizacji - muszą być IDENTYCZNE');
        console.log('   4. Spróbuj wymusić sync przyciskiem "Wymuś sync" na obu urządzeniach\n');
        
    } catch (error) {
        console.error('   ❌ NIEOCZEKIWANY BŁĄD:', error);
        console.log('\n🔍 DIAGNOZA: Inny problem (nie reguły Firestore)');
        console.log('   Szczegóły błędu:', error.message);
        console.log('   Kod błędu:', error.code);
        console.log('\n💡 ROZWIĄZANIE:');
        console.log('   1. Sprawdź połączenie internetowe');
        console.log('   2. Spróbuj odświeżyć stronę (Ctrl+Shift+R)');
        console.log('   3. Sprawdź czy Firebase nie ma przerwy technicznej: https://status.firebase.google.com/\n');
    }
}

testFirestore();

console.log('\n📋 PODSUMOWANIE:');
console.log('   Po zakończeniu testu zobaczysz diagnozę i instrukcje.');
console.log('   Jeśli widzisz "permission-denied" = sprawdź reguły Firestore!');
console.log('   Zobacz plik FIRESTORE_RULES_CHECK.md dla szczegółów.\n');
