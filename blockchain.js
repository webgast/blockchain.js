//author webgast.nl (c) Johan Perk 2020

class Blockchain {

    //long ago, in a galaxy far away, there was a blockchain object.
    constructor () {
        console.log('constructor');
        this.blocks = []; //there was a humble array to store the chain
    }
    
    //it could hash something primitively.
    hashCode(s) {
        var iets = JSON.stringify(s);
        console.log('hashCode called with something to hash: ' + iets);
        return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    }
    
    //if a transaction is added, the chain is checked.
    addBlock(transaction) {
        console.log('addBlock called with transaction: ' + transaction);
        if(this.blocks.length > 0) {
            //there was already blocks, let us push
            console.log('twas the Nth transaction, the block is added to the chain');
            this.blocks.push([transaction, this.hashCode(this.blocks[this.blocks.length-1][1] + transaction)]);    
        } else {
            //TODO maybe use JSON.stringify instead of toString()
            console.log('twas the beginning, a hash of the object and transaction will be made as a seed');
            //this.blocks.push([transaction, this.hashCode(this.toString() + transaction)]);
            this.blocks.push([transaction, this.hashCode(JSON.stringify(this) + transaction)]);
        }
        
        //we will show our valour and bounty in the console, as in the auspuff div for mere mortals, jawohl.
        console.log(this.blocks);
        
    }
    
    //checks whether chain is coherent, will dismiss part which does not compute.
    checkChain() {
        console.log('checkChain is called');
        auspuff.innerHTML = '';
        let geht_schon = true;

        //iterate through all blocks
        for(var block in this.blocks) {

            //block hash moet een combinatie zijn van ('hash_vorige_block' + 'eigen_waarde');
            //zo niet; is de volledige ketting na fout ongeldig.

            if(block == 0) {
                console.log('we assume the zero block is legit, write to auspuff');
                auspuff.innerHTML += '<span style="color:green;">' + JSON.stringify(this.blocks[block]) + "</span><br />";
                continue;
            } else {
                console.log('hash of current block ' + block + ' is: ' + this.blocks[block][1]);
                console.log('it should match a hash of the previous block (' + this.blocks[block-1][1] + ') and the current transaction (' + this.blocks[block][0] + ') which is: ' + this.hashCode(this.blocks[block-1][1] + this.blocks[block][0]));
            }
                        
            if(this.hashCode(this.blocks[block-1][1] + this.blocks[block][0]) == this.blocks[block][1]) {
                if(!geht_schon) {
                  auspuff.innerHTML += '<span style="color:orange;">' + JSON.stringify(this.blocks[block]) + "</span><br />";
                } else {
                   auspuff.innerHTML += '<span style="color:green;">' + JSON.stringify(this.blocks[block]) + "</span><br />"; 
                }
            } else {
                geht_schon = false;
                auspuff.innerHTML += '<span style="color:red;">' + JSON.stringify(this.blocks[block]) + "</span><br />";
            }
        }
    }
    
}