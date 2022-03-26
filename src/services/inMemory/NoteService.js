const { nanoid } = require('nanoid');

class NoteService {
    constructor() {
        this._notes = [];
    }

    addNote({ title, body, tags }) {

        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        // Buat sebuah catatan baru
        const newNote = {
            title,
            tags,
            body,
            id,
            createdAt,
            updatedAt
        }

        this._notes.push(newNote);

        // Cek apakah newNote sudah ada di dalam this._notes
        // dengan mengambil id yang sudah dibuat
        const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

        // Jika false maka kembalikan error
        if (!isSuccess) {
            throw new Error('Catatan Gagal Ditambahkan');
        }

        // Jika true maka kembalikan id
        return id;
    }

    getNotes() {
        // Kembalikan seluruh catatan
        // yang ada di dalam this._notes
        return this._notes;
    }

    getNoteById(id) {
        // Cek note dengan id yang diberikan
        // apakah id tersebut ada di dalam this._notes
        const note = this._notes.filter((n) => n.id === id)[0];

        // Jika tidak ada maka kembalikan error
        if (!note) {
            throw new Error('Catatan tidak ditemukan');
        }

        // Jika ada maka kembalikan note yang dicari
        return note;
    }

    editNoteById(id, { title, body, tags }) {
        // Cek apakah id yang diberikan ada pada this._notes;
        const index = this._notes.findIndex((n) => n.id === id);

        // Jika tidak ada maka kembalikan error
        if (index === -1) {
            throw new Error('Gagal memperbarui catatan. Id tidak ditemukan');
        }

        // Cetak tanggal lokal
        const updatedAt = new Date().toISOString();

        // Update note sesuai idnya
        this._notes[index] = {
            ...this._notes[index],
            title,
            tags,
            body,
            updatedAt
        }; 
    }

    deleteNoteById(id) {
        // Cek apakah id yang diberikan ada pada this._notes;
       const index = this._notes.findIndex((n) => n.id === id);

        // Jika tidak ada maka kembalikan error
       if (index === -1) {
           throw new Error('Gagal menghapus catatan. Id tidak ditemukan');
       }

        // Jika ada maka hapus note tersebut lale kembalikan nilainya    
       this._notes.splice(index, 1);
    }
}

module.exports = NoteService;