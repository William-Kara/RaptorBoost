<template>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                    <li v-for="user in Users" :key="user.key">
                        <p>{{ user.name }}</p>
                        <p>{{ user.email }}</p>
                        <p>{{ user.phone }}</p>

                            <button @click.prevent="deleteUser(user.key)" class="btn btn-danger">Delete</button>

                        <youtube :video-id="user.name" @ready="ready" @playing="playing"></youtube>
                    </li>
            </table>
                

        </div>
    </div>
</template>

<script>
    import { db } from '../firebaseDb';
    
    export default {
        data() {
            return {
                Users: []
            }
        },
        created() {
            db.collection('users').onSnapshot((snapshotChange) => {
                this.Users = [];
                snapshotChange.forEach((doc) => {
                    this.Users.push({
                        key: doc.id,
                        name: doc.data().name,
                        email: doc.data().email,
                        phone: doc.data().phone
                    })
                });
            })
        },
        methods: {
            deleteUser(id){
              if (window.confirm("Do you really want to delete?")) {
                db.collection("users").doc(id).delete().then(() => {
                    console.log("Document deleted!");
                })
                .catch((error) => {
                    console.error(error);
                })
              }
            }
        }
    }
</script>

<style>
    .btn-primary {
        margin-right: 12px;
    }
</style>

